import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import {
  FIRST_TOUCH_COOKIE,
  LAST_TOUCH_COOKIE,
  VISITOR_COOKIE,
  classifyReferrer,
  isTrackableDocumentNavigation,
  matchesDomain,
  parseAttributionCookie,
  resolveAttribution,
} from "../lib/attribution";
import { proxy } from "../proxy";
import { GET as getAttributionRoute } from "../app/api/attribution/route";
import { POST as postTrackRoute, resetTrackRateLimiter } from "../app/api/track/route";
import { POST as postConsentRoute } from "../app/api/consent/route";
import { setDbForTesting } from "../db";
import { trackingEvents, visitors } from "../db/schema";

function createInMemoryDb(options) {
  const eventsMap = new Map();
  const visitorsMap = new Map();

  const mockDb = {
    eventsMap,
    visitorsMap,
    insert(table) {
      return {
        values(row) {
          if (options?.failOnInsert) {
            throw new Error("Simulated database connection failure");
          }
          if (table === trackingEvents) {
            return {
              onConflictDoNothing() {
                return {
                  async returning() {
                    const eventId = String(row.eventId);
                    if (eventsMap.has(eventId)) {
                      return [];
                    }
                    const id = `evt_${eventsMap.size + 1}`;
                    eventsMap.set(eventId, {
                      id,
                      eventId,
                      visitorId: String(row.visitorId),
                      eventName: String(row.eventName),
                      page: row.page ?? null,
                      source: row.source ?? null,
                      medium: row.medium ?? null,
                      campaign: row.campaign ?? null,
                      content: row.content ?? null,
                      term: row.term ?? null,
                      campaignId: row.campaignId ?? null,
                      referrer: row.referrer ?? null,
                    });
                    return [{ id }];
                  },
                };
              },
            };
          }

          if (table === visitors) {
            return {
              async onConflictDoUpdate(cfg) {
                const visitorId = String(row.visitorId);
                const existing = visitorsMap.get(visitorId);
                if (!existing) {
                  visitorsMap.set(visitorId, {
                    visitorId,
                    device: row.device ?? null,
                    browser: row.browser ?? null,
                    firstSource: row.firstSource ?? null,
                    firstMedium: row.firstMedium ?? null,
                    firstCampaign: row.firstCampaign ?? null,
                    firstContent: row.firstContent ?? null,
                    firstTerm: row.firstTerm ?? null,
                    firstCampaignId: row.firstCampaignId ?? null,
                    firstReferrer: row.firstReferrer ?? null,
                    firstLandingUrl: row.firstLandingUrl ?? null,
                    lastSource: row.lastSource ?? null,
                    lastMedium: row.lastMedium ?? null,
                    lastCampaign: row.lastCampaign ?? null,
                    lastContent: row.lastContent ?? null,
                    lastTerm: row.lastTerm ?? null,
                    lastCampaignId: row.lastCampaignId ?? null,
                    lastReferrer: row.lastReferrer ?? null,
                    lastLandingUrl: row.lastLandingUrl ?? null,
                    pageViews: Number(row.pageViews ?? 1),
                  });
                  return;
                }

                existing.pageViews += 1;
                if (typeof cfg.set.device === "string") existing.device = cfg.set.device;
                if (typeof cfg.set.browser === "string") existing.browser = cfg.set.browser;

                if (
                  (!existing.firstSource ||
                    existing.firstSource === "direct" ||
                    existing.firstSource === "unknown") &&
                  row.firstSource &&
                  row.firstSource !== "direct" &&
                  row.firstSource !== "unknown"
                ) {
                  existing.firstSource = row.firstSource;
                  existing.firstMedium = row.firstMedium ?? existing.firstMedium;
                }
                existing.firstCampaign ??= row.firstCampaign ?? null;
                existing.firstContent ??= row.firstContent ?? null;
                existing.firstTerm ??= row.firstTerm ?? null;
                existing.firstCampaignId ??= row.firstCampaignId ?? null;
                existing.firstReferrer ??= row.firstReferrer ?? null;
                existing.firstLandingUrl ??= row.firstLandingUrl ?? null;

                if (typeof cfg.set.lastSource === "string") {
                  existing.lastSource = cfg.set.lastSource;
                  existing.lastMedium = cfg.set.lastMedium ?? null;
                  existing.lastCampaign = cfg.set.lastCampaign ?? null;
                  existing.lastContent = cfg.set.lastContent ?? null;
                  existing.lastTerm = cfg.set.lastTerm ?? null;
                  existing.lastCampaignId = cfg.set.lastCampaignId ?? null;
                  existing.lastReferrer = cfg.set.lastReferrer ?? null;
                  existing.lastLandingUrl = cfg.set.lastLandingUrl ?? null;
                }
              },
            };
          }

          throw new Error("Unknown table");
        },
      };
    },
  };

  return mockDb;
}

test("Instagram and YouTube backward compatibility (UTM, Referer, click ID, and in-app UA)", () => {
  const igRef = resolveAttribution({
    searchParams: new URLSearchParams(),
    pathname: "/product/tts",
    referrerHeader: "https://l.instagram.com/?u=https%3A%2F%2Fmiralas.io%2Fproduct%2Ftts",
    currentHost: "miralas.io",
  });
  assert.ok(igRef);
  assert.equal(igRef.source, "instagram");
  assert.equal(igRef.medium, "social");
  assert.equal(igRef.referrer, "l.instagram.com");
  assert.equal(igRef.landing_url, "/product/tts");

  const igClick = resolveAttribution({
    searchParams: new URLSearchParams("igshid=MzRlODBiNWFlZA=="),
    pathname: "/",
    currentHost: "miralas.io",
  });
  assert.ok(igClick);
  assert.equal(igClick.source, "instagram");
  assert.equal(igClick.medium, "social");
  assert.equal(igClick.landing_url, "/");

  const igUa = resolveAttribution({
    searchParams: new URLSearchParams(),
    pathname: "/pricing",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 324.0.0.21.90",
    currentHost: "miralas.io",
  });
  assert.ok(igUa);
  assert.equal(igUa.source, "instagram");
  assert.equal(igUa.medium, "social");

  const ytShort = resolveAttribution({
    searchParams: new URLSearchParams(),
    pathname: "/",
    referrerHeader: "https://youtu.be/dQw4w9WgXcQ",
    currentHost: "miralas.io",
  });
  assert.ok(ytShort);
  assert.equal(ytShort.source, "youtube");
  assert.equal(ytShort.medium, "social");
  assert.equal(ytShort.referrer, "youtu.be");

  const ytUtm = resolveAttribution({
    searchParams: new URLSearchParams("utm_source=YouTube&utm_medium=Social&utm_campaign=Uzbek_Launch_2026"),
    pathname: "/product/models",
    currentHost: "miralas.io",
  });
  assert.ok(ytUtm);
  assert.equal(ytUtm.source, "youtube");
  assert.equal(ytUtm.medium, "social");
  assert.equal(ytUtm.campaign, "Uzbek_Launch_2026");
});

test("Universal UTM support: arbitrary sources, all 6 UTM parameters, case preservation, and duplicate params", () => {
  const params = new URLSearchParams([
    ["utm_source", "  TechCrunch_Daily  "],
    ["utm_medium", "Paid-Social"],
    ["utm_campaign", "SpringLaunch_v3_UZ"],
    ["utm_content", "Hero_CTA_Button_A"],
    ["utm_term", "uzbek+voice+ai"],
    ["utm_id", "cmp_99481A"],
    ["utm_source", "ignored_duplicate"],
  ]);

  const attr = resolveAttribution({
    searchParams: params,
    pathname: "/solutions/enterprise-voice?secret_token=should_not_be_saved",
    referrerHeader: "https://techcrunch.com/2026/11/25/miralas-voice-ai/",
    currentHost: "miralas.io",
  });

  assert.ok(attr);
  assert.equal(attr.source, "techcrunch_daily");
  assert.equal(attr.medium, "paid_social");
  assert.equal(attr.campaign, "SpringLaunch_v3_UZ");
  assert.equal(attr.content, "Hero_CTA_Button_A");
  assert.equal(attr.term, "uzbek+voice+ai");
  assert.equal(attr.campaign_id, "cmp_99481A");
  assert.equal(attr.referrer, "techcrunch.com");
  assert.equal(attr.landing_url, "/solutions/enterprise-voice");
});

test("Referrer classification: search engines, social platforms, AI assistants, communities, newsletters, and unknown external domains", () => {
  const cases = [
    ["https://www.google.com/search?q=miralas", "google", "organic", "google.com"],
    ["https://www.google.co.uk/search?q=miralas", "google", "organic", "google.co.uk"],
    ["https://www.google.com.tr/", "google", "organic", "google.com.tr"],
    ["https://www.bing.com/search?q=miralas", "bing", "organic", "bing.com"],
    ["https://duckduckgo.com/?q=miralas", "duckduckgo", "organic", "duckduckgo.com"],
    ["https://x.com/miransas/status/12345", "x", "social", "x.com"],
    ["https://t.co/abcd123", "x", "social", "t.co"],
    ["https://www.linkedin.com/feed/", "linkedin", "social", "linkedin.com"],
    ["https://lnkd.in/e4r5t6", "linkedin", "social", "lnkd.in"],
    ["https://m.facebook.com/story.php", "facebook", "social", "m.facebook.com"],
    ["https://www.tiktok.com/@miralas", "tiktok", "social", "tiktok.com"],
    ["https://old.reddit.com/r/MachineLearning/", "reddit", "social", "old.reddit.com"],
    ["https://chatgpt.com/c/1234-5678", "chatgpt", "ai", "chatgpt.com"],
    ["https://chat.openai.com/", "chatgpt", "ai", "chat.openai.com"],
    ["https://gemini.google.com/app", "gemini", "ai", "gemini.google.com"],
    ["https://www.perplexity.ai/search/uzbek-tts", "perplexity", "ai", "perplexity.ai"],
    ["https://claude.ai/chat/abc", "claude", "ai", "claude.ai"],
    ["https://github.com/Miransas/miralas", "github", "community", "github.com"],
    ["https://www.producthunt.com/posts/miralas", "producthunt", "community", "producthunt.com"],
    ["https://news.ycombinator.com/item?id=400000", "hackernews", "community", "news.ycombinator.com"],
    ["https://aiweekly.substack.com/p/voice-ai", "substack", "newsletter", "aiweekly.substack.com"],
    ["https://www.uzdaily.uz/en/post/12345?token=secret", "uzdaily.uz", "referral", "uzdaily.uz"],
  ];

  for (const [refererUrl, expectedSource, expectedMedium, expectedHost] of cases) {
    const classified = classifyReferrer(refererUrl, "miralas.io");
    assert.ok(classified, `Expected ${refererUrl} to be classified`);
    assert.equal(classified.source, expectedSource, `Source mismatch for ${refererUrl}`);
    assert.equal(classified.medium, expectedMedium, `Medium mismatch for ${refererUrl}`);
    assert.equal(classified.referrerHost, expectedHost, `Host mismatch for ${refererUrl}`);
  }
});

test("Hostname spoofing resistance and internal navigation exclusion", () => {
  assert.equal(matchesDomain("google.com.evil.example", "google.com"), false);
  assert.equal(matchesDomain("fakeinstagram.com", "instagram.com"), false);
  assert.equal(matchesDomain("myyoutube.com", "youtube.com"), false);
  assert.equal(matchesDomain("chatgpt.com.attacker.io", "chatgpt.com"), false);

  const spoofedGoogle = classifyReferrer("https://google.com.evil.example/phish", "miralas.io");
  assert.ok(spoofedGoogle);
  assert.equal(spoofedGoogle.source, "google.com.evil.example");
  assert.equal(spoofedGoogle.medium, "referral");

  const spoofedIg = classifyReferrer("https://notinstagram.com/post", "miralas.io");
  assert.ok(spoofedIg);
  assert.equal(spoofedIg.source, "notinstagram.com");
  assert.equal(spoofedIg.medium, "referral");

  assert.equal(classifyReferrer("https://miralas.io/pricing", "miralas.io"), null);
  assert.equal(classifyReferrer("https://console.miralas.io/studio", "miralas.io"), null);
  assert.equal(classifyReferrer("https://miralas.org/docs", "miralas.io"), null);
  assert.equal(classifyReferrer("https://miransas.com/", "miralas.io"), null);
  assert.equal(classifyReferrer("http://localhost:3000/product", "localhost:3000"), null);

  const internalInApp = resolveAttribution({
    searchParams: new URLSearchParams(),
    pathname: "/pricing",
    referrerHeader: "https://miralas.io/",
    userAgent: "Mozilla/5.0 Instagram 324.0",
    currentHost: "miralas.io",
  });
  assert.equal(internalInApp, null);
});

test("Direct traffic and malformed/oversized parameter rejection", () => {
  const direct = resolveAttribution({
    searchParams: new URLSearchParams(),
    pathname: "/",
    referrerHeader: null,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36",
    currentHost: "miralas.io",
  });
  assert.equal(direct, null);

  const oversizedSource = "a".repeat(200);
  const xssCampaign = "<script>alert(1)</script>";
  const sqliContent = "banner' OR 1=1 --";
  const badUtm = resolveAttribution({
    searchParams: new URLSearchParams({
      utm_source: oversizedSource,
      utm_medium: "!!!invalid$$$",
      utm_campaign: xssCampaign,
      utm_content: sqliContent,
    }),
    pathname: "/",
    currentHost: "miralas.io",
  });
  assert.equal(badUtm, null);

  assert.equal(classifyReferrer("javascript:alert(1)", "miralas.io"), null);
  assert.equal(classifyReferrer("data:text/html,hello", "miralas.io"), null);
  assert.equal(classifyReferrer("not a valid url", "miralas.io"), null);
});

test("Prefetch, RSC, API, and static asset exclusion in proxy", () => {
  const prefetchReq = new NextRequest("https://miralas.io/pricing?utm_source=google", {
    headers: { "next-router-prefetch": "1", "sec-fetch-dest": "empty" },
  });
  assert.equal(isTrackableDocumentNavigation(prefetchReq), false);
  const prefetchRes = proxy(prefetchReq);
  assert.equal(prefetchRes.cookies.get(FIRST_TOUCH_COOKIE), undefined);

  const rscReq = new NextRequest("https://miralas.io/product?utm_source=github", {
    headers: { rsc: "1" },
  });
  assert.equal(isTrackableDocumentNavigation(rscReq), false);

  for (const path of [
    "/api/track",
    "/_next/static/chunks/main.js",
    "/hero.mp4",
    "/portraits/hero.png",
    "/shaders/beam.glsl",
    "/fonts/jakarta.woff2",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ]) {
    const assetReq = new NextRequest(`https://miralas.io${path}?utm_source=leak`);
    assert.equal(isTrackableDocumentNavigation(assetReq), false, `Expected ${path} to be excluded`);
    const assetRes = proxy(assetReq);
    assert.equal(assetRes.cookies.get(VISITOR_COOKIE), undefined);
  }
});

test("First-touch and last-non-direct-touch preservation across sessions and internal navigation", async () => {
  resetTrackRateLimiter();
  const mockDb = createInMemoryDb();
  setDbForTesting(mockDb);

  try {
    const req1 = new NextRequest("https://miralas.io/?utm_source=perplexity&utm_medium=ai&utm_campaign=VoiceSearch&utm_id=px_01", {
      headers: {
        referer: "https://www.perplexity.ai/search/uzbek-voice-ai",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
      },
    });
    const res1 = proxy(req1);
    const visitorId = res1.cookies.get(VISITOR_COOKIE)?.value;
    const firstTouch1 = res1.cookies.get(FIRST_TOUCH_COOKIE)?.value;
    const lastTouch1 = res1.cookies.get(LAST_TOUCH_COOKIE)?.value;
    assert.ok(visitorId);
    assert.ok(firstTouch1);
    assert.ok(lastTouch1);

    const parsedFirst1 = parseAttributionCookie(firstTouch1);
    assert.equal(parsedFirst1.source, "perplexity");
    assert.equal(parsedFirst1.medium, "ai");
    assert.equal(parsedFirst1.campaign, "VoiceSearch");
    assert.equal(parsedFirst1.campaign_id, "px_01");
    assert.equal(parsedFirst1.referrer, "perplexity.ai");

    const req2 = new NextRequest("https://miralas.io/pricing", {
      headers: {
        referer: "https://miralas.io/",
        cookie: `${VISITOR_COOKIE}=${visitorId}; ${FIRST_TOUCH_COOKIE}=${encodeURIComponent(firstTouch1)}; ${LAST_TOUCH_COOKIE}=${encodeURIComponent(lastTouch1)}`,
      },
    });
    const res2 = proxy(req2);
    assert.equal(res2.cookies.get(FIRST_TOUCH_COOKIE), undefined);
    assert.equal(res2.cookies.get(LAST_TOUCH_COOKIE), undefined);

    const req3 = new NextRequest("https://miralas.io/docs", {
      headers: {
        referer: "https://github.com/Miransas/miralas",
        cookie: `${VISITOR_COOKIE}=${visitorId}; ${FIRST_TOUCH_COOKIE}=${firstTouch1}; ${LAST_TOUCH_COOKIE}=${lastTouch1}`,
      },
    });
    const res3 = proxy(req3);
    assert.equal(res3.cookies.get(FIRST_TOUCH_COOKIE), undefined);
    const lastTouch3 = res3.cookies.get(LAST_TOUCH_COOKIE)?.value;
    assert.ok(lastTouch3);
    const parsedLast3 = parseAttributionCookie(lastTouch3);
    assert.equal(parsedLast3.source, "github");
    assert.equal(parsedLast3.medium, "community");
    assert.equal(parsedLast3.landing_url, "/docs");

    const attrApiReq = new NextRequest("https://miralas.io/api/attribution", {
      headers: {
        cookie: `${FIRST_TOUCH_COOKIE}=${firstTouch1}; ${LAST_TOUCH_COOKIE}=${lastTouch3}`,
      },
    });
    const attrApiRes = await getAttributionRoute(attrApiReq);
    const attrJson = await attrApiRes.json();
    assert.equal(attrJson.first.source, "perplexity");
    assert.equal(attrJson.last.source, "github");

    const trackReq1 = new NextRequest("https://miralas.io/api/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Chrome/126.0.0.0 Safari/537.36",
        cookie: `consent=granted; ${VISITOR_COOKIE}=${visitorId}; ${FIRST_TOUCH_COOKIE}=${firstTouch1}; ${LAST_TOUCH_COOKIE}=${lastTouch1}`,
      },
      body: JSON.stringify({
        eventId: "evt-perplexity-1",
        eventName: "page_view",
        page: "/",
      }),
    });
    const trackRes1 = await postTrackRoute(trackReq1);
    assert.equal(trackRes1.status, 200);
    assert.deepEqual(await trackRes1.json(), { success: true, duplicate: false });

    const trackReq2 = new NextRequest("https://miralas.io/api/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Chrome/126.0.0.0 Safari/537.36",
        cookie: `consent=granted; ${VISITOR_COOKIE}=${visitorId}; ${FIRST_TOUCH_COOKIE}=${firstTouch1}; ${LAST_TOUCH_COOKIE}=${lastTouch3}`,
      },
      body: JSON.stringify({
        eventId: "evt-github-2",
        eventName: "page_view",
        page: "/docs",
      }),
    });
    const trackRes2 = await postTrackRoute(trackReq2);
    assert.equal(trackRes2.status, 200);

    const trackReq3 = new NextRequest("https://miralas.io/api/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: `consent=granted; ${VISITOR_COOKIE}=${visitorId}`,
      },
      body: JSON.stringify({
        eventId: "evt-direct-3",
        eventName: "page_view",
        page: "/pricing",
      }),
    });
    const trackRes3 = await postTrackRoute(trackReq3);
    assert.equal(trackRes3.status, 200);

    const savedVisitor = mockDb.visitorsMap.get(visitorId);
    assert.ok(savedVisitor);
    assert.equal(savedVisitor.pageViews, 3);
    assert.equal(savedVisitor.firstSource, "perplexity");
    assert.equal(savedVisitor.firstMedium, "ai");
    assert.equal(savedVisitor.firstCampaign, "VoiceSearch");
    assert.equal(savedVisitor.firstCampaignId, "px_01");
    assert.equal(savedVisitor.lastSource, "github");
    assert.equal(savedVisitor.lastMedium, "community");
    assert.equal(savedVisitor.lastLandingUrl, "/docs");
  } finally {
    setDbForTesting(undefined);
  }
});

test("Duplicate requests idempotency, consent enforcement, and graceful database failure", async () => {
  resetTrackRateLimiter();
  const mockDb = createInMemoryDb();
  setDbForTesting(mockDb);

  try {
    const visitorId = "visitor_dedup_test_12345";

    const noConsentReq = new NextRequest("https://miralas.io/api/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: `${VISITOR_COOKIE}=${visitorId}`,
      },
      body: JSON.stringify({ eventId: "evt_no_consent", eventName: "page_view", page: "/" }),
    });
    const noConsentRes = await postTrackRoute(noConsentReq);
    assert.equal(noConsentRes.status, 403);
    assert.equal(mockDb.eventsMap.size, 0);

    const deniedProxyReq = new NextRequest("https://miralas.io/?utm_source=instagram", {
      headers: { cookie: "consent=denied" },
    });
    const deniedProxyRes = proxy(deniedProxyReq);
    assert.equal(deniedProxyRes.cookies.get(VISITOR_COOKIE), undefined);
    assert.equal(deniedProxyRes.cookies.get(FIRST_TOUCH_COOKIE), undefined);

    const makeDupReq = () =>
      new NextRequest("https://miralas.io/api/track", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `consent=granted; ${VISITOR_COOKIE}=${visitorId}`,
        },
        body: JSON.stringify({
          eventId: "evt_duplicate_check_1",
          eventName: "page_view",
          page: "/product/tts",
          attribution: {
            pathname: "/product/tts",
            search: "?utm_source=chatgpt&utm_medium=ai&utm_campaign=GPT_Referral",
            referrer: "https://chatgpt.com/",
          },
        }),
      });

    const firstRes = await postTrackRoute(makeDupReq());
    assert.deepEqual(await firstRes.json(), { success: true, duplicate: false });

    const secondRes = await postTrackRoute(makeDupReq());
    assert.deepEqual(await secondRes.json(), { success: true, duplicate: true });

    assert.equal(mockDb.eventsMap.size, 1);
    assert.equal(mockDb.visitorsMap.get(visitorId)?.pageViews, 1);
    assert.equal(mockDb.visitorsMap.get(visitorId)?.firstSource, "chatgpt");

    const failingDb = createInMemoryDb({ failOnInsert: true });
    setDbForTesting(failingDb);
    const origError = console.error;
    console.error = () => {};
    try {
      const failReq = new NextRequest("https://miralas.io/api/track", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `consent=granted; ${VISITOR_COOKIE}=${visitorId}`,
        },
        body: JSON.stringify({
          eventId: "evt_during_db_outage",
          eventName: "page_view",
          page: "/",
        }),
      });
      const failRes = await postTrackRoute(failReq);
      assert.equal(failRes.status, 202);
      const failBody = await failRes.json();
      assert.equal(failBody.degraded, true);
    } finally {
      console.error = origError;
    }

    const revokeReq = new NextRequest("https://miralas.io/api/consent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ choice: "denied" }),
    });
    const revokeRes = await postConsentRoute(revokeReq);
    const setCookieHeader = revokeRes.headers.get("set-cookie") ?? "";
    assert.match(setCookieHeader, /consent=denied/);
    assert.match(setCookieHeader, /visitor_id=; Max-Age=0/);
    assert.match(setCookieHeader, /attribution_first=; Max-Age=0/);
    assert.match(setCookieHeader, /attribution_last=; Max-Age=0/);
  } finally {
    setDbForTesting(undefined);
  }
});
