import { NextRequest, NextResponse } from "next/server";

const FIRST_TOUCH_COOKIE = "attribution_first";
const LAST_TOUCH_COOKIE = "attribution_last";
const VISITOR_COOKIE = "visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 gün

// Kendi domainlerin: bunlardan gelen referer "referral" sayılmaz
const OWN_HOSTS = ["miralas.io", "miralas.org"];

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: COOKIE_MAX_AGE,
  path: "/",
  domain: process.env.NODE_ENV === "production" ? ".miralas.io" : undefined,
};

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

function isOwnHost(hostname: string) {
  return OWN_HOSTS.some((h) => hostname === h || hostname.endsWith("." + h));
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

  return { device, browser };
}

/*
 * Sadece gerçek tarayıcı sayfa navigasyonları.
 * Prefetch ve RSC istekleri sahte referral üretiyordu.
 */
function isDocumentNavigation(request: NextRequest) {
  const h = request.headers;
  if (h.get("next-router-prefetch")) return false;
  if (h.get("purpose") === "prefetch") return false;
  if (h.get("rsc")) return false;
  const dest = h.get("sec-fetch-dest");
  if (dest && dest !== "document") return false;
  return true;
}

function getAttribution(request: NextRequest): Attribution | null {
  const { searchParams, href } = request.nextUrl;
  const referrer = request.headers.get("referer");
  const ua = request.headers.get("user-agent") || "";

  const base = {
    campaign: searchParams.get("utm_campaign"),
    content: searchParams.get("utm_content"),
    term: searchParams.get("utm_term"),
    referrer,
    landing_url: href,
    captured_at: new Date().toISOString(),
  };

  // 1) UTM
  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  if (utmSource || utmMedium || base.campaign || base.content || base.term) {
    return {
      ...base,
      source: utmSource || "unknown",
      medium: utmMedium || "unknown",
    };
  }

  // 2) Click ID'ler (UTM'siz reklam/sosyal linkleri)
  if (searchParams.get("gclid"))
    return { ...base, source: "google", medium: "cpc" };
  if (searchParams.get("fbclid"))
    return { ...base, source: "facebook", medium: "social" };
  if (searchParams.get("igshid"))
    return { ...base, source: "instagram", medium: "social" };
  if (searchParams.get("ttclid"))
    return { ...base, source: "tiktok", medium: "social" };

  // 3) Referer (kendi siteni HARİÇ tut)
  if (referrer) {
    try {
      const url = new URL(referrer);
      if (url.protocol === "android-app:") {
        return { ...base, source: url.hostname, medium: "referral" };
      }
      if (!isOwnHost(url.hostname)) {
        return { ...base, source: url.hostname, medium: "referral" };
      }
      return null; // internal navigation
    } catch {
      return null;
    }
  }

  // 4) Referer yok ama in-app browser (Instagram vs.)
  if (/Instagram/i.test(ua))
    return { ...base, source: "instagram", medium: "social" };
  if (/FBAN|FBAV/i.test(ua))
    return { ...base, source: "facebook", medium: "social" };
  if (/musical_ly|BytedanceWebview|TikTok/i.test(ua))
    return { ...base, source: "tiktok", medium: "social" };

  // Attribution yok. "direct" burada set edilmez, internal navigation'da
  // mevcut attribution bozulmasın.
  return null;
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Prefetch / RSC / fetch istekleri tracking'e girmesin
  if (!isDocumentNavigation(request)) return response;

  // Visitor ID
  let visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, cookieOptions);
  }

  const attribution = getAttribution(request);
  if (!attribution) return response;

  const serialized = JSON.stringify(attribution);

  // FIRST TOUCH: sadece ilk attribution geldiğinde
  if (!request.cookies.get(FIRST_TOUCH_COOKIE)) {
    response.cookies.set(FIRST_TOUCH_COOKIE, serialized, cookieOptions);
  }

  // LAST TOUCH: her yeni attribution'da güncelle
  response.cookies.set(LAST_TOUCH_COOKIE, serialized, cookieOptions);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mjs|map|txt|xml|woff|woff2|ttf|otf)$).*)",
  ],
};