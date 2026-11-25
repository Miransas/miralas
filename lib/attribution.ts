export const FIRST_TOUCH_COOKIE = "attribution_first";
export const LAST_TOUCH_COOKIE = "attribution_last";
export const VISITOR_COOKIE = "visitor_id";
export const CONSENT_COOKIE = "consent";

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export const OWN_HOSTS = ["miralas.io", "miralas.org", "miransas.com", "localhost", "127.0.0.1"];

export const MAX_SOURCE_LEN = 64;
export const MAX_MEDIUM_LEN = 64;
export const MAX_CAMPAIGN_LEN = 128;
export const MAX_CONTENT_LEN = 128;
export const MAX_TERM_LEN = 128;
export const MAX_CAMPAIGN_ID_LEN = 128;
export const MAX_REFERRER_HOST_LEN = 255;
export const MAX_PATHNAME_LEN = 500;

export type Attribution = {
  source: string;
  medium: string;
  campaign: string | null;
  content: string | null;
  term: string | null;
  campaign_id: string | null;
  referrer: string | null;
  landing_url: string;
  captured_at: string;
};

export type ReferrerClassification = {
  source: string;
  medium: string;
  referrerHost: string;
};

type DomainRule = {
  domains: readonly string[];
  source: string;
  medium: string;
};

const DOMAIN_RULES: readonly DomainRule[] = [
  // Social platforms
  {
    domains: ["instagram.com", "l.instagram.com", "ig.me", "com.instagram.android"],
    source: "instagram",
    medium: "social",
  },
  {
    domains: [
      "youtube.com",
      "youtu.be",
      "m.youtube.com",
      "music.youtube.com",
      "com.google.android.youtube",
    ],
    source: "youtube",
    medium: "social",
  },
  {
    domains: [
      "twitter.com",
      "x.com",
      "t.co",
      "mobile.twitter.com",
      "com.twitter.android",
    ],
    source: "x",
    medium: "social",
  },
  {
    domains: [
      "linkedin.com",
      "lnkd.in",
      "com.linkedin.android",
    ],
    source: "linkedin",
    medium: "social",
  },
  {
    domains: [
      "facebook.com",
      "fb.com",
      "fb.me",
      "m.facebook.com",
      "l.facebook.com",
      "lm.facebook.com",
      "com.facebook.katana",
    ],
    source: "facebook",
    medium: "social",
  },
  {
    domains: [
      "tiktok.com",
      "vm.tiktok.com",
      "vt.tiktok.com",
      "com.zhiliaoapp.musically",
    ],
    source: "tiktok",
    medium: "social",
  },
  {
    domains: [
      "reddit.com",
      "old.reddit.com",
      "out.reddit.com",
      "redd.it",
      "com.reddit.frontpage",
    ],
    source: "reddit",
    medium: "social",
  },
  {
    domains: ["t.me", "telegram.me", "telegram.org", "web.telegram.org", "org.telegram.messenger"],
    source: "telegram",
    medium: "social",
  },
  {
    domains: ["threads.net", "threads.com"],
    source: "threads",
    medium: "social",
  },
  {
    domains: ["bsky.app"],
    source: "bluesky",
    medium: "social",
  },
  {
    domains: ["discord.com", "discordapp.com"],
    source: "discord",
    medium: "social",
  },

  // AI assistants
  {
    domains: ["chatgpt.com", "chat.openai.com", "openai.com"],
    source: "chatgpt",
    medium: "ai",
  },
  {
    domains: ["gemini.google.com", "bard.google.com", "aistudio.google.com"],
    source: "gemini",
    medium: "ai",
  },
  {
    domains: ["perplexity.ai", "labs.perplexity.ai"],
    source: "perplexity",
    medium: "ai",
  },
  {
    domains: ["claude.ai", "anthropic.com"],
    source: "claude",
    medium: "ai",
  },
  {
    domains: ["copilot.microsoft.com"],
    source: "copilot",
    medium: "ai",
  },
  {
    domains: ["you.com"],
    source: "you",
    medium: "ai",
  },
  {
    domains: ["phind.com"],
    source: "phind",
    medium: "ai",
  },

  // Developer communities & launch platforms
  {
    domains: ["github.com", "gist.github.com"],
    source: "github",
    medium: "community",
  },
  {
    domains: ["producthunt.com"],
    source: "producthunt",
    medium: "community",
  },
  {
    domains: ["news.ycombinator.com", "ycombinator.com"],
    source: "hackernews",
    medium: "community",
  },
  {
    domains: ["dev.to"],
    source: "devto",
    medium: "community",
  },
  {
    domains: ["stackoverflow.com", "stackexchange.com"],
    source: "stackoverflow",
    medium: "community",
  },
  {
    domains: ["medium.com"],
    source: "medium",
    medium: "community",
  },
  {
    domains: ["hashnode.com"],
    source: "hashnode",
    medium: "community",
  },
  {
    domains: ["huggingface.co"],
    source: "huggingface",
    medium: "community",
  },

  // Newsletters
  {
    domains: ["substack.com"],
    source: "substack",
    medium: "newsletter",
  },
  {
    domains: ["beehiiv.com"],
    source: "beehiiv",
    medium: "newsletter",
  },
  {
    domains: ["buttondown.email", "buttondown.com"],
    source: "buttondown",
    medium: "newsletter",
  },
  {
    domains: ["mailchimp.com", "list-manage.com"],
    source: "mailchimp",
    medium: "newsletter",
  },
  {
    domains: ["convertkit.com", "kit.com"],
    source: "kit",
    medium: "newsletter",
  },

  // Search engines
  {
    domains: ["bing.com", "cn.bing.com"],
    source: "bing",
    medium: "organic",
  },
  {
    domains: ["duckduckgo.com"],
    source: "duckduckgo",
    medium: "organic",
  },
  {
    domains: ["search.yahoo.com", "yahoo.com"],
    source: "yahoo",
    medium: "organic",
  },
  {
    domains: ["yandex.com", "yandex.ru", "yandex.uz", "yandex.com.tr", "ya.ru"],
    source: "yandex",
    medium: "organic",
  },
  {
    domains: ["baidu.com"],
    source: "baidu",
    medium: "organic",
  },
  {
    domains: ["ecosia.org"],
    source: "ecosia",
    medium: "organic",
  },
  {
    domains: ["search.brave.com"],
    source: "brave",
    medium: "organic",
  },
];

const SOURCE_ALIASES: Record<string, string> = {
  ig: "instagram",
  insta: "instagram",
  "instagram.com": "instagram",
  "l.instagram.com": "instagram",
  yt: "youtube",
  "youtube.com": "youtube",
  "youtu.be": "youtube",
  twitter: "x",
  "twitter.com": "x",
  "x.com": "x",
  "t.co": "x",
  fb: "facebook",
  "facebook.com": "facebook",
  "linkedin.com": "linkedin",
  "lnkd.in": "linkedin",
  "tiktok.com": "tiktok",
  "reddit.com": "reddit",
  "github.com": "github",
  "producthunt.com": "producthunt",
  "product_hunt": "producthunt",
  "product-hunt": "producthunt",
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "gemini.google.com": "gemini",
  "perplexity.ai": "perplexity",
  "google.com": "google",
  "bing.com": "bing",
};

const MEDIUM_ALIASES: Record<string, string> = {
  "paid-search": "cpc",
  "paid_search": "cpc",
  paidsearch: "cpc",
  ppc: "cpc",
  "paid-social": "paid_social",
  paidsocial: "paid_social",
  "organic-social": "social",
  organicsocial: "social",
  "social-media": "social",
  "social_media": "social",
  "e-mail": "email",
};

const CLICK_ID_RULES: readonly { param: string; source: string; medium: string }[] = [
  { param: "gclid", source: "google", medium: "cpc" },
  { param: "gbraid", source: "google", medium: "cpc" },
  { param: "wbraid", source: "google", medium: "cpc" },
  { param: "msclkid", source: "bing", medium: "cpc" },
  { param: "fbclid", source: "facebook", medium: "social" },
  { param: "igshid", source: "instagram", medium: "social" },
  { param: "ttclid", source: "tiktok", medium: "social" },
  { param: "twclid", source: "x", medium: "social" },
  { param: "li_fat_id", source: "linkedin", medium: "social" },
  { param: "rdt_cid", source: "reddit", medium: "social" },
];

const STATIC_EXT_REGEX =
  /\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|mjs|cjs|map|txt|xml|json|webmanifest|woff|woff2|ttf|otf|eot|mp4|webm|ogg|mp3|wav|flac|aac|m4a|glsl|vert|frag|wgsl|wasm|pdf|zip)$/i;

/**
 * Checks whether a hostname matches a target domain by exact hostname or verified subdomain.
 * Prevents spoofing like `google.com.evil.example` or `fakeinstagram.com`.
 */
export function matchesDomain(hostname: string, domain: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  const target = domain.toLowerCase().replace(/\.$/, "");
  return host === target || host.endsWith("." + target);
}

/**
 * Checks whether a hostname is an internal/own host (including current request host).
 */
export function isOwnHost(hostname: string, currentHost?: string | null): boolean {
  const host = hostname.toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  if (!host) return false;
  if (OWN_HOSTS.some((own) => matchesDomain(host, own))) return true;
  if (currentHost) {
    const cleanCurrent = currentHost.toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
    if (cleanCurrent && matchesDomain(host, cleanCurrent)) return true;
  }
  return false;
}

/**
 * Matches Google Search regional domains (`google.com`, `google.co.uk`, `google.com.tr`, `google.uz`, etc.)
 * while excluding non-search Google subdomains that have their own rules (`gemini.google.com`, `aistudio.google.com`, `mail.google.com`).
 */
function isGoogleSearchHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (
    matchesDomain(host, "gemini.google.com") ||
    matchesDomain(host, "bard.google.com") ||
    matchesDomain(host, "aistudio.google.com")
  ) {
    return false;
  }
  return /^(?:www\.|search\.|scholar\.|news\.|images\.|encrypted\.)?google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(
    host
  );
}

function stripControlChars(input: string): string {
  return input.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
}

/**
 * Normalizes `utm_source` or `utm_medium`:
 * - Lowercases and trims
 * - Strips control characters
 * - Rejects values with invalid characters or exceeding length limit
 * - Collapses spaces/separators into safe tokens (`[a-z0-9._+-]`)
 */
export function normalizeSourceOrMedium(
  raw: unknown,
  maxLen: number,
  aliasMap?: Record<string, string>
): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = stripControlChars(raw).toLowerCase();
  if (!cleaned || cleaned.length > maxLen) return null;
  // Normalize whitespace to underscores
  const compact = cleaned.replace(/\s+/g, "_");
  // Must contain at least one alphanumeric character and only safe identifier characters
  if (!/^[a-z0-9][a-z0-9._+-]*$/.test(compact)) return null;
  return aliasMap?.[compact] ?? compact;
}

/**
 * Validates and sanitizes case-preserving UTM fields (`utm_campaign`, `utm_content`, `utm_term`, `utm_id`).
 * Rejects oversized, non-string, or HTML/script-injected values.
 */
export function sanitizeCampaignField(raw: unknown, maxLen: number): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = stripControlChars(raw);
  if (!cleaned || cleaned.length > maxLen) return null;
  // Reject angle brackets, quotes, backticks, or control sequences
  if (/[<>'"`\\]/.test(cleaned)) return null;
  return cleaned;
}

/**
 * Sanitizes a landing pathname. Strips query strings and fragments to prevent storing sensitive tokens.
 */
export function sanitizePathname(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  const cleaned = stripControlChars(raw);
  if (!cleaned.startsWith("/") || cleaned.startsWith("//")) return "/";
  const pathOnly = cleaned.split("?")[0]?.split("#")[0] ?? "/";
  if (!pathOnly || pathOnly.length > MAX_PATHNAME_LEN) {
    return pathOnly.slice(0, MAX_PATHNAME_LEN) || "/";
  }
  return pathOnly;
}

/**
 * Sanitizes a referrer hostname (never stores full URL, path, or query string).
 */
export function sanitizeReferrerHost(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = stripControlChars(raw).toLowerCase().replace(/^www\./, "");
  if (!cleaned || cleaned.length > MAX_REFERRER_HOST_LEN) return null;
  if (!/^[a-z0-9.-]+$/.test(cleaned) || cleaned.startsWith(".") || cleaned.endsWith(".")) {
    return null;
  }
  return cleaned;
}

/**
 * Classifies an external Referer header into `{ source, medium, referrerHost }`.
 * Returns `null` for empty, malformed, unsupported protocols, or internal (own-host) referrers.
 */
export function classifyReferrer(
  referrerHeader: string | null | undefined,
  currentHost?: string | null
): ReferrerClassification | null {
  if (!referrerHeader || typeof referrerHeader !== "string") return null;
  const trimmed = referrerHeader.trim();
  if (!trimmed || trimmed.length > 2048) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const protocol = url.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:" && protocol !== "android-app:") {
    return null;
  }

  const rawHost = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!rawHost || rawHost.length > MAX_REFERRER_HOST_LEN) return null;
  if (!/^[a-z0-9.-]+$/.test(rawHost)) return null;

  if (protocol !== "android-app:" && isOwnHost(rawHost, currentHost)) {
    return null;
  }

  const canonicalHost = rawHost.replace(/^www\./, "");

  if (matchesDomain(rawHost, "mail.google.com")) {
    return { source: "gmail", medium: "email", referrerHost: canonicalHost };
  }
  if (matchesDomain(rawHost, "outlook.live.com") || matchesDomain(rawHost, "outlook.office.com")) {
    return { source: "outlook", medium: "email", referrerHost: canonicalHost };
  }

  if (isGoogleSearchHost(rawHost)) {
    return { source: "google", medium: "organic", referrerHost: canonicalHost };
  }

  for (const rule of DOMAIN_RULES) {
    for (const domain of rule.domains) {
      if (matchesDomain(rawHost, domain)) {
        return {
          source: rule.source,
          medium: rule.medium,
          referrerHost: canonicalHost,
        };
      }
    }
  }

  return {
    source: canonicalHost,
    medium: "referral",
    referrerHost: canonicalHost,
  };
}

/**
 * Detects known in-app browser User-Agents when Referer is stripped by the native webview.
 */
export function classifyInAppBrowser(userAgent: string | null | undefined): {
  source: string;
  medium: string;
} | null {
  if (!userAgent || typeof userAgent !== "string") return null;
  if (/Instagram/i.test(userAgent)) return { source: "instagram", medium: "social" };
  if (/FBAN|FBAV|FB_IAB/i.test(userAgent)) return { source: "facebook", medium: "social" };
  if (/musical_ly|BytedanceWebview|TikTok/i.test(userAgent)) {
    return { source: "tiktok", medium: "social" };
  }
  if (/LinkedInApp/i.test(userAgent)) return { source: "linkedin", medium: "social" };
  return null;
}

function defaultMediumForSource(source: string): string {
  switch (source) {
    case "instagram":
    case "youtube":
    case "x":
    case "linkedin":
    case "facebook":
    case "tiktok":
    case "reddit":
    case "telegram":
    case "threads":
    case "bluesky":
    case "discord":
      return "social";
    case "google":
    case "bing":
    case "duckduckgo":
    case "yahoo":
    case "yandex":
    case "baidu":
    case "ecosia":
    case "brave":
      return "organic";
    case "chatgpt":
    case "gemini":
    case "perplexity":
    case "claude":
    case "copilot":
    case "you":
    case "phind":
      return "ai";
    case "github":
    case "producthunt":
    case "hackernews":
    case "devto":
    case "stackoverflow":
    case "medium":
    case "hashnode":
    case "huggingface":
      return "community";
    case "substack":
    case "beehiiv":
    case "buttondown":
    case "mailchimp":
    case "kit":
      return "newsletter";
    case "email":
    case "gmail":
    case "outlook":
      return "email";
    default:
      return "campaign";
  }
}

/**
 * Extracts and validates UTM parameters from URLSearchParams.
 * Uses the first non-empty valid value if duplicate keys exist.
 */
export function parseUtmParams(searchParams: URLSearchParams) {
  const firstParam = (key: string): string | null => {
    const values = searchParams.getAll(key);
    for (const val of values) {
      if (val && val.trim().length > 0) return val;
    }
    return null;
  };

  const rawSource = firstParam("utm_source");
  const rawMedium = firstParam("utm_medium");
  const rawCampaign = firstParam("utm_campaign");
  const rawContent = firstParam("utm_content");
  const rawTerm = firstParam("utm_term");
  const rawId = firstParam("utm_id");

  const source = normalizeSourceOrMedium(rawSource, MAX_SOURCE_LEN, SOURCE_ALIASES);
  const medium = normalizeSourceOrMedium(rawMedium, MAX_MEDIUM_LEN, MEDIUM_ALIASES);
  const campaign = sanitizeCampaignField(rawCampaign, MAX_CAMPAIGN_LEN);
  const content = sanitizeCampaignField(rawContent, MAX_CONTENT_LEN);
  const term = sanitizeCampaignField(rawTerm, MAX_TERM_LEN);
  const campaignId = sanitizeCampaignField(rawId, MAX_CAMPAIGN_ID_LEN);

  const hasAnyValidUtm = Boolean(source || medium || campaign || content || term || campaignId);

  return {
    hasAnyValidUtm,
    source,
    medium,
    campaign,
    content,
    term,
    campaignId,
  };
}

/**
 * Resolves traffic attribution for an incoming request following priority:
 * 1. Explicit valid UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`)
 * 2. Known ad/social click identifiers (`gclid`, `fbclid`, `igshid`, `ttclid`, `msclkid`, etc.)
 * 3. External Referer header classification
 * 4. Known in-app browser User-Agent classification
 * Returns `null` when no external attribution signal is present (direct visit or internal navigation).
 */
export function resolveAttribution(input: {
  searchParams: URLSearchParams;
  pathname: string;
  referrerHeader?: string | null;
  userAgent?: string | null;
  currentHost?: string | null;
  now?: Date;
}): Attribution | null {
  const landingPath = sanitizePathname(input.pathname);
  const capturedAt = (input.now ?? new Date()).toISOString();
  const refClassification = classifyReferrer(input.referrerHeader, input.currentHost);
  const referrerHost = refClassification?.referrerHost ?? null;

  const utm = parseUtmParams(input.searchParams);

  // 1) Explicit valid UTM parameters
  if (utm.hasAnyValidUtm) {
    const resolvedSource = utm.source ?? refClassification?.source ?? "unknown";
    const resolvedMedium =
      utm.medium ??
      (utm.source ? defaultMediumForSource(utm.source) : refClassification?.medium ?? "campaign");

    return {
      source: resolvedSource,
      medium: resolvedMedium,
      campaign: utm.campaign,
      content: utm.content,
      term: utm.term,
      campaign_id: utm.campaignId,
      referrer: referrerHost,
      landing_url: landingPath,
      captured_at: capturedAt,
    };
  }

  // 2) Known platform click IDs (only if non-empty and reasonable length)
  for (const rule of CLICK_ID_RULES) {
    const val = input.searchParams.get(rule.param);
    if (val && val.trim().length > 0 && val.trim().length <= 256) {
      return {
        source: rule.source,
        medium: rule.medium,
        campaign: null,
        content: null,
        term: null,
        campaign_id: null,
        referrer: referrerHost,
        landing_url: landingPath,
        captured_at: capturedAt,
      };
    }
  }

  // 3) External Referer header classification
  if (refClassification) {
    return {
      source: refClassification.source,
      medium: refClassification.medium,
      campaign: null,
      content: null,
      term: null,
      campaign_id: null,
      referrer: refClassification.referrerHost,
      landing_url: landingPath,
      captured_at: capturedAt,
    };
  }

  // If Referer was present and pointed to our own host, this is internal navigation — never re-attribute
  if (input.referrerHeader) {
    try {
      const parsedRef = new URL(input.referrerHeader);
      if (isOwnHost(parsedRef.hostname, input.currentHost)) {
        return null;
      }
    } catch {
      // ignore malformed referer
    }
  }

  // 4) Known in-app browser fallback (only when no internal referer is present)
  const inApp = classifyInAppBrowser(input.userAgent);
  if (inApp) {
    return {
      source: inApp.source,
      medium: inApp.medium,
      campaign: null,
      content: null,
      term: null,
      campaign_id: null,
      referrer: null,
      landing_url: landingPath,
      captured_at: capturedAt,
    };
  }

  return null;
}

/**
 * Safely parses and validates an Attribution JSON cookie payload.
 * Ensures all fields respect length and format constraints even if a client tampers with the cookie.
 */
export function parseAttributionCookie(rawCookieValue?: string | null): Attribution | null {
  if (!rawCookieValue || typeof rawCookieValue !== "string" || rawCookieValue.length > 4096) {
    return null;
  }
  try {
    const parsed = JSON.parse(rawCookieValue) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return null;

    const source = normalizeSourceOrMedium(parsed.source, MAX_SOURCE_LEN, SOURCE_ALIASES);
    const medium = normalizeSourceOrMedium(parsed.medium, MAX_MEDIUM_LEN, MEDIUM_ALIASES);
    if (!source || !medium) return null;

    let referrer: string | null = null;
    if (typeof parsed.referrer === "string" && parsed.referrer.trim()) {
      // Backward compatibility: if an older cookie stored a full URL in `referrer`, extract its hostname
      try {
        if (parsed.referrer.includes("://")) {
          const u = new URL(parsed.referrer);
          referrer = sanitizeReferrerHost(u.hostname);
        } else {
          referrer = sanitizeReferrerHost(parsed.referrer);
        }
      } catch {
        referrer = sanitizeReferrerHost(parsed.referrer);
      }
    }

    let landingUrl = "/";
    if (typeof parsed.landing_url === "string" && parsed.landing_url.trim()) {
      try {
        if (parsed.landing_url.includes("://")) {
          const u = new URL(parsed.landing_url);
          landingUrl = sanitizePathname(u.pathname);
        } else {
          landingUrl = sanitizePathname(parsed.landing_url);
        }
      } catch {
        landingUrl = sanitizePathname(parsed.landing_url);
      }
    }

    return {
      source,
      medium,
      campaign: sanitizeCampaignField(parsed.campaign, MAX_CAMPAIGN_LEN),
      content: sanitizeCampaignField(parsed.content, MAX_CONTENT_LEN),
      term: sanitizeCampaignField(parsed.term, MAX_TERM_LEN),
      campaign_id: sanitizeCampaignField(parsed.campaign_id, MAX_CAMPAIGN_ID_LEN),
      referrer,
      landing_url: landingUrl,
      captured_at:
        typeof parsed.captured_at === "string" && parsed.captured_at.length <= 64
          ? parsed.captured_at
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Determines whether a request represents a real top-level document navigation
 * (excluding static assets, shaders, videos, API routes, RSC, and prefetches).
 */
export function isTrackableDocumentNavigation(request: {
  method?: string;
  nextUrl: { pathname: string };
  headers: { get(name: string): string | null };
}): boolean {
  const method = (request.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") return false;

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api/") ||
    pathname === "/api" ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/_vercel/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    STATIC_EXT_REGEX.test(pathname)
  ) {
    return false;
  }

  const getHeader = (key: string) => request.headers.get(key);

  if (getHeader("next-router-prefetch")) return false;
  if (getHeader("next-router-state-tree")) return false;
  if (getHeader("purpose") === "prefetch" || getHeader("sec-purpose")?.includes("prefetch")) {
    return false;
  }
  if (getHeader("x-middleware-prefetch")) return false;
  if (getHeader("rsc")) return false;

  const dest = getHeader("sec-fetch-dest");
  if (dest && dest !== "document") return false;

  const mode = getHeader("sec-fetch-mode");
  if (mode && mode !== "navigate") return false;

  return true;
}

export function isDirectOrNoneAttribution(attr: Attribution | null | undefined): boolean {
  if (!attr) return true;
  return (
    (attr.source === "direct" || attr.source === "unknown") &&
    (attr.medium === "none" || attr.medium === "unknown") &&
    !attr.campaign &&
    !attr.content &&
    !attr.term &&
    !attr.campaign_id &&
    !attr.referrer
  );
}
