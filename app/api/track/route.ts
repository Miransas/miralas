import { NextRequest, NextResponse } from "next/server";
import { sql, type SQL } from "drizzle-orm";

import { visitors, trackingEvents } from "@/db/schema";
import {
  CONSENT_COOKIE,
  FIRST_TOUCH_COOKIE,
  LAST_TOUCH_COOKIE,
  VISITOR_COOKIE,
  isDirectOrNoneAttribution,
  parseAttributionCookie,
  resolveAttribution,
  sanitizePathname,
  type Attribution,
} from "@/lib/attribution";
import { getDb } from "../../../db";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_EVENTS = 60;
const MAX_TRACKED_SESSIONS = 5_000;

const visitorRateBuckets = new Map<string, { count: number; resetAt: number }>();

export function resetTrackRateLimiter() {
  visitorRateBuckets.clear();
}

function checkVisitorRateLimit(visitorId: string, now = Date.now()): boolean {
  if (visitorRateBuckets.size > MAX_TRACKED_SESSIONS) {
    for (const [key, bucket] of visitorRateBuckets) {
      if (bucket.resetAt <= now) visitorRateBuckets.delete(key);
    }
    if (visitorRateBuckets.size > MAX_TRACKED_SESSIONS) {
      const oldestKey = visitorRateBuckets.keys().next().value;
      if (oldestKey) visitorRateBuckets.delete(oldestKey);
    }
  }

  const existing = visitorRateBuckets.get(visitorId);
  if (!existing || existing.resetAt <= now) {
    visitorRateBuckets.set(visitorId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX_EVENTS) {
    return false;
  }

  existing.count += 1;
  return true;
}

function cleanString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
  if (!s || s.length > max) return null;
  return s;
}

function isValidVisitorId(v: unknown): v is string {
  if (typeof v !== "string") return false;
  const trimmed = v.trim();
  return (
    trimmed.length >= 8 &&
    trimmed.length <= 128 &&
    /^[a-zA-Z0-9_-]+$/.test(trimmed)
  );
}

function isValidEventName(v: unknown): v is string {
  if (typeof v !== "string") return false;
  return /^[a-zA-Z0-9_.:-]{1,64}$/.test(v.trim());
}

function parseUserAgent(ua: string) {
  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet|ipad/i.test(ua)) device = "Tablet";

  let browser = "Chrome";
  if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/edge/i.test(ua)) browser = "Edge";
  else if (/opr|opera/i.test(ua)) browser = "Opera";
  else if (/samsung/i.test(ua)) browser = "Samsung Browser";

  return { device, browser };
}

function parseClientFallbackAttribution(
  body: Record<string, unknown>,
  defaultPathname: string,
  currentHost: string | null,
  userAgent: string
): Attribution | null {
  const rawAttribution = body.attribution;
  if (!rawAttribution || typeof rawAttribution !== "object") return null;
  const record = rawAttribution as Record<string, unknown>;
  const rawSearch = typeof record.search === "string" ? record.search.slice(0, 2048) : "";
  const rawReferrer =
    typeof record.referrer === "string" ? record.referrer.slice(0, 2048) : null;
  const rawPathname =
    typeof record.pathname === "string" ? sanitizePathname(record.pathname) : defaultPathname;

  let searchParams: URLSearchParams;
  try {
    searchParams = new URLSearchParams(rawSearch.startsWith("?") ? rawSearch.slice(1) : rawSearch);
  } catch {
    searchParams = new URLSearchParams();
  }

  return resolveAttribution({
    searchParams,
    pathname: rawPathname,
    referrerHeader: rawReferrer,
    userAgent,
    currentHost,
  });
}

export async function POST(request: NextRequest) {
  if (request.cookies.get(CONSENT_COOKIE)?.value !== "granted") {
    return NextResponse.json({ success: false, error: "no_consent" }, { status: 403 });
  }

  const visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!isValidVisitorId(visitorId)) {
    return NextResponse.json(
      { success: false, error: "visitor_id_missing" },
      { status: 400 }
    );
  }

  if (!checkVisitorRateLimit(visitorId)) {
    return NextResponse.json(
      { success: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const eventId = cleanString(body.eventId, 100);
  if (!eventId || !/^[a-zA-Z0-9_.:-]+$/.test(eventId)) {
    return NextResponse.json(
      { success: false, error: "event_id_invalid" },
      { status: 400 }
    );
  }

  const rawEventName = cleanString(body.eventName, 64);
  const eventName = rawEventName && isValidEventName(rawEventName) ? rawEventName : "page_view";

  const rawPage = cleanString(body.page, 500);
  const page = rawPage && rawPage.startsWith("/") ? sanitizePathname(rawPage) : null;

  const uaHeader = request.headers.get("user-agent") || "";
  const { device, browser } = parseUserAgent(uaHeader);
  const currentHost = request.headers.get("host") ?? request.nextUrl.hostname;

  const cookieFirstTouch = parseAttributionCookie(
    request.cookies.get(FIRST_TOUCH_COOKIE)?.value
  );
  const cookieLastTouch = parseAttributionCookie(
    request.cookies.get(LAST_TOUCH_COOKIE)?.value
  );
  const fallbackAttribution = parseClientFallbackAttribution(
    body,
    page ?? "/",
    currentHost,
    uaHeader
  );

  const firstTouch =
    cookieFirstTouch && !isDirectOrNoneAttribution(cookieFirstTouch)
      ? cookieFirstTouch
      : fallbackAttribution ?? cookieFirstTouch;

  const lastTouch =
    cookieLastTouch && !isDirectOrNoneAttribution(cookieLastTouch)
      ? cookieLastTouch
      : fallbackAttribution ?? cookieLastTouch;

  try {
    const db = getDb();

    // 1) Idempotent event insert — if eventId already exists, skip visitor counter increment
    const inserted = await db
      .insert(trackingEvents)
      .values({
        eventId,
        visitorId,
        eventName,
        page,
        source: lastTouch?.source ?? "direct",
        medium: lastTouch?.medium ?? "none",
        campaign: lastTouch?.campaign ?? null,
        content: lastTouch?.content ?? null,
        term: lastTouch?.term ?? null,
        campaignId: lastTouch?.campaign_id ?? null,
        referrer: lastTouch?.referrer ?? null,
      })
      .onConflictDoNothing({ target: trackingEvents.eventId })
      .returning({ id: trackingEvents.id });

    if (inserted.length === 0) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    // 2) Upsert visitor session & attribution state.
    // Direct visits and internal navigation never overwrite a known non-direct campaign attribution.
    const set: Record<string, SQL | Date | string | null> = {
      pageViews: sql`${visitors.pageViews} + 1`,
      lastSeenAt: new Date(),
      device,
      browser,
    };

    if (firstTouch && !isDirectOrNoneAttribution(firstTouch)) {
      set.firstSource = sql`CASE WHEN ${visitors.firstSource} IS NULL OR ${visitors.firstSource} IN ('direct', 'unknown') THEN ${firstTouch.source} ELSE ${visitors.firstSource} END`;
      set.firstMedium = sql`CASE WHEN ${visitors.firstSource} IS NULL OR ${visitors.firstSource} IN ('direct', 'unknown') THEN ${firstTouch.medium} ELSE ${visitors.firstMedium} END`;
      set.firstCampaign = sql` COALESCE(${visitors.firstCampaign}, ${firstTouch.campaign})`;
      set.firstContent = sql`COALESCE(${visitors.firstContent}, ${firstTouch.content})`;
      set.firstTerm = sql`COALESCE(${visitors.firstTerm}, ${firstTouch.term})`;
      set.firstCampaignId = sql`COALESCE(${visitors.firstCampaignId}, ${firstTouch.campaign_id})`;
      set.firstReferrer = sql`COALESCE(${visitors.firstReferrer}, ${firstTouch.referrer})`;
      set.firstLandingUrl = sql`COALESCE(${visitors.firstLandingUrl}, ${firstTouch.landing_url})`;
    }

    if (lastTouch && !isDirectOrNoneAttribution(lastTouch)) {
      set.lastSource = lastTouch.source;
      set.lastMedium = lastTouch.medium;
      set.lastCampaign = lastTouch.campaign;
      set.lastContent = lastTouch.content;
      set.lastTerm = lastTouch.term;
      set.lastCampaignId = lastTouch.campaign_id;
      set.lastReferrer = lastTouch.referrer;
      set.lastLandingUrl = lastTouch.landing_url;
    }

    await db
      .insert(visitors)
      .values({
        visitorId,
        device,
        browser,

        firstSource: firstTouch?.source ?? "direct",
        firstMedium: firstTouch?.medium ?? "none",
        firstCampaign: firstTouch?.campaign ?? null,
        firstContent: firstTouch?.content ?? null,
        firstTerm: firstTouch?.term ?? null,
        firstCampaignId: firstTouch?.campaign_id ?? null,
        firstReferrer: firstTouch?.referrer ?? null,
        firstLandingUrl: firstTouch?.landing_url ?? page ?? "/",

        lastSource: lastTouch?.source ?? "direct",
        lastMedium: lastTouch?.medium ?? "none",
        lastCampaign: lastTouch?.campaign ?? null,
        lastContent: lastTouch?.content ?? null,
        lastTerm: lastTouch?.term ?? null,
        lastCampaignId: lastTouch?.campaign_id ?? null,
        lastReferrer: lastTouch?.referrer ?? null,
        lastLandingUrl: lastTouch?.landing_url ?? page ?? "/",

        pageViews: 1,
      })
      .onConflictDoUpdate({
        target: visitors.visitorId,
        set,
      });

    return NextResponse.json({ success: true, duplicate: false });
  } catch (error) {
    console.error("Tracking ingestion degraded:", error);
    // Graceful degradation: never fail user experience when analytics database is unavailable
    return NextResponse.json(
      { success: false, degraded: true, error: "tracking_unavailable" },
      { status: 202 }
    );
  }
}
