import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_AGE = 60 * 60 * 24 * 180;
const TRACKING = ["visitor_id", "attribution_first", "attribution_last"];
const prod = process.env.NODE_ENV === "production";
const domain = prod ? ".miralas.io" : undefined;
const secure = prod ? "; Secure" : "";

function cookie(name: string, value: string, maxAge: number, d?: string) {
  return `${name}=${value}; Max-Age=${maxAge}; Path=/${d ? `; Domain=${d}` : ""}; SameSite=Lax${secure}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const choice =
    body?.choice === "granted" || body?.choice === "denied" ? body.choice : null;

  if (!choice) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const res = NextResponse.json({ success: true });
  res.headers.append("Set-Cookie", cookie("consent", choice, MAX_AGE, domain));

  if (choice === "denied") {
    for (const name of TRACKING) {
      res.headers.append("Set-Cookie", cookie(name, "", 0)); // eski host-only çerezler
      if (domain) res.headers.append("Set-Cookie", cookie(name, "", 0, domain));
    }
  }

  return res;
}