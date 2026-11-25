import { NextRequest, NextResponse } from "next/server";
import {
  FIRST_TOUCH_COOKIE,
  LAST_TOUCH_COOKIE,
  parseAttributionCookie,
} from "@/lib/attribution";

export async function GET(request: NextRequest) {
  const first = parseAttributionCookie(
    request.cookies.get(FIRST_TOUCH_COOKIE)?.value
  );
  const last = parseAttributionCookie(
    request.cookies.get(LAST_TOUCH_COOKIE)?.value
  );

  return NextResponse.json(
    { first, last },
    { headers: { "Cache-Control": "no-store" } }
  );
}
