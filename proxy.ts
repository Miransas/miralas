import { NextRequest, NextResponse } from "next/server";
import {
  CONSENT_COOKIE,
  COOKIE_MAX_AGE,
  FIRST_TOUCH_COOKIE,
  LAST_TOUCH_COOKIE,
  VISITOR_COOKIE,
  isDirectOrNoneAttribution,
  isTrackableDocumentNavigation,
  parseAttributionCookie,
  resolveAttribution,
  type Attribution,
} from "./lib/attribution";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: COOKIE_MAX_AGE,
  path: "/",
  domain: process.env.NODE_ENV === "production" ? ".miralas.io" : undefined,
};

export function getAttribution(request: NextRequest): Attribution | null {
  return resolveAttribution({
    searchParams: request.nextUrl.searchParams,
    pathname: request.nextUrl.pathname,
    referrerHeader: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    currentHost: request.headers.get("host") ?? request.nextUrl.hostname,
  });
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Exclude static assets, shaders, videos, API routes, RSC, and prefetches
  if (!isTrackableDocumentNavigation(request)) return response;

  // Respect explicit privacy rejection: never set tracking or attribution cookies when consent=denied
  const consent = request.cookies.get(CONSENT_COOKIE)?.value;
  if (consent === "denied") {
    return response;
  }

  // Ensure anonymous visitor session identifier
  let visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, cookieOptions);
  }

  const attribution = getAttribution(request);
  if (!attribution) return response;

  const serialized = JSON.stringify(attribution);

  // FIRST TOUCH: set when no first-touch exists, or upgrade if existing first-touch was direct/unknown
  const existingFirst = parseAttributionCookie(request.cookies.get(FIRST_TOUCH_COOKIE)?.value);
  if (!existingFirst || isDirectOrNoneAttribution(existingFirst)) {
    response.cookies.set(FIRST_TOUCH_COOKIE, serialized, cookieOptions);
  }

  // LAST NON-DIRECT TOUCH: update whenever a valid external attribution signal is resolved
  response.cookies.set(LAST_TOUCH_COOKIE, serialized, cookieOptions);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|mjs|cjs|map|txt|xml|json|webmanifest|woff|woff2|ttf|otf|eot|mp4|webm|ogg|mp3|wav|flac|aac|m4a|glsl|vert|frag|wgsl|wasm|pdf|zip)$).*)",
  ],
};
