import { NextRequest, NextResponse } from "next/server";

const FIRST_TOUCH_COOKIE = "attribution_first";
const LAST_TOUCH_COOKIE = "attribution_last";
const VISITOR_COOKIE = "visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 day

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

function getAttribution(
  request: NextRequest
): Attribution | null {
  const { searchParams, href } = request.nextUrl;

  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmContent = searchParams.get("utm_content");
  const utmTerm = searchParams.get("utm_term");

  const referrer = request.headers.get("referer");

  /*
   * UTM varsa kesin attribution.
   */
  if (
    utmSource ||
    utmMedium ||
    utmCampaign ||
    utmContent ||
    utmTerm
  ) {
    return {
      source: utmSource || "unknown",
      medium: utmMedium || "unknown",
      campaign: utmCampaign,
      content: utmContent,
      term: utmTerm,
      referrer,
      landing_url: href,
      captured_at: new Date().toISOString(),
    };
  }

  /*
   * Referer varsa referral.
   */
  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);

      return {
        source: referrerUrl.hostname,
        medium: "referral",
        campaign: null,
        content: null,
        term: null,
        referrer,
        landing_url: href,
        captured_at: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  /*
   * No attribution without UTM parameters or a referrer.
   *
   * Do not set DIRECT here.
   *
   * If the user arrived from Instagram, attribution
   * should remain intact during internal navigation.
   */
  return null;
}

function createVisitorId() {
  return crypto.randomUUID();
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  /*
   * Create a visitor ID.
   */
  let visitorId =
    request.cookies.get(VISITOR_COOKIE)?.value;

  if (!visitorId) {
    visitorId = createVisitorId();

    response.cookies.set(
      VISITOR_COOKIE,
      visitorId,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  /*
   * Attribution yakala.
   */
  const attribution = getAttribution(request);

  const firstTouch = request.cookies.get(
    FIRST_TOUCH_COOKIE
  );

  /*
   * FIRST TOUCH
   *
   * Create only when the first attribution arrives.
   */
  if (attribution && !firstTouch) {
    response.cookies.set(
      FIRST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  /*
   * LAST TOUCH
   *
   * Update only when there is new attribution.
   *
   * /pricing
   * /about
   * /signup
   *
   * gibi internal navigation'larda
   * Attribution does not change.
   */
  if (attribution) {
    response.cookies.set(
      LAST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Target only real page requests.
     *
     * API
     * _next
     * static
     * image
     * favicon
     * sitemap
     * robots
     * File extensions
     *
     * tracking'e girmeyecek.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mjs|map|txt|xml|woff|woff2|ttf|otf)$).*)",
  ],
};
