import { NextRequest, NextResponse } from "next/server";
import { sql, type SQL } from "drizzle-orm";

import { visitors, trackingEvents } from "@/db/schema";
import { getDb } from "../../../db";

export const dynamic = "force-dynamic";

type Attribution = {
  source: string;
  medium: string;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  landing_url: string;
  captured_at: string;
};

function parseCookie<T>(value?: string): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function cleanString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s || s.length > max) return null;
  return s;
}

// 📌 YENİ: User-Agent'tan Cihaz ve Tarayıcı Çözümleme Fonksiyonu
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

export async function POST(request: NextRequest) {
  if (request.cookies.get("consent")?.value !== "granted") {
    return NextResponse.json({ success: false, error: "no_consent" }, { status: 403 });
  }
  try {
    const db = getDb();
    const visitorId = request.cookies.get("visitor_id")?.value;
    if (!visitorId) {
      return NextResponse.json(
        { success: false, error: "visitor_id_missing" },
        { status: 400 }
      );
    }

    // 📌 User-Agent bilgisini header'dan alıyoruz
    const uaHeader = request.headers.get("user-agent") || "";
    const { device, browser } = parseUserAgent(uaHeader);

    const firstTouch = parseCookie<Attribution>(
      request.cookies.get("attribution_first")?.value
    );
    const lastTouch = parseCookie<Attribution>(
      request.cookies.get("attribution_last")?.value
    );

    const body = await request.json().catch(() => ({}));

    const eventId = cleanString(body.eventId, 100);
    if (!eventId) {
      return NextResponse.json(
        { success: false, error: "event_id_invalid" },
        { status: 400 }
      );
    }

    const eventName = cleanString(body.eventName, 64) ?? "page_view";

    let page = cleanString(body.page, 500);
    if (page && !page.startsWith("/")) page = null;

    /*
     * 1) Event önce. Çakışırsa duplicate, visitor'a dokunma.
     */
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
      })
      .onConflictDoNothing({ target: trackingEvents.eventId })
      .returning({ id: trackingEvents.id });

    if (inserted.length === 0) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    /*
     * 2) Visitor tek upsert.
     */
    const set: Record<string, SQL | Date | string | null> = {
      pageViews: sql`${visitors.pageViews} + 1`,
      lastSeenAt: new Date(),
      device, // Güncellenirken de cihazı taze tutalım
      browser, // Tarayıcıyı taze tutalım
    };

    if (lastTouch) {
      set.lastSource = lastTouch.source;
      set.lastMedium = lastTouch.medium;
      set.lastCampaign = lastTouch.campaign;
      set.lastContent = lastTouch.content;
      set.lastTerm = lastTouch.term;
      set.lastReferrer = lastTouch.referrer;
      set.lastLandingUrl = lastTouch.landing_url;
    }

    await db
      .insert(visitors)
      .values({
        visitorId,

        // 📌 Cihaz ve Tarayıcıyı İlk Kayıtta Veritabanına Yazıyoruz
        device,
        browser,

        firstSource: firstTouch?.source ?? "direct",
        firstMedium: firstTouch?.medium ?? "none",
        firstCampaign: firstTouch?.campaign ?? null,
        firstContent: firstTouch?.content ?? null,
        firstTerm: firstTouch?.term ?? null,
        firstReferrer: firstTouch?.referrer ?? null,
        firstLandingUrl: firstTouch?.landing_url ?? null,

        lastSource: lastTouch?.source ?? "direct",
        lastMedium: lastTouch?.medium ?? "none",
        lastCampaign: lastTouch?.campaign ?? null,
        lastContent: lastTouch?.content ?? null,
        lastTerm: lastTouch?.term ?? null,
        lastReferrer: lastTouch?.referrer ?? null,
        lastLandingUrl: lastTouch?.landing_url ?? null,

        pageViews: 1,
      })
      .onConflictDoUpdate({
        target: visitors.visitorId,
        set,
      });

    return NextResponse.json({ success: true, duplicate: false });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { success: false, error: "tracking_failed" },
      { status: 500 }
    );
  }
}