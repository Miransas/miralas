import { ImageResponse } from "next/og";
import { MODEL_LANGUAGES } from "@/lib/voice-technology";

export const OG_IMAGE_ALT = "Miralas — AI Voice Infrastructure by Miransas";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export function renderMiralasOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 82% 20%, rgba(249, 115, 22, 0.24), transparent 46%), radial-gradient(circle at 18% 85%, rgba(255, 255, 255, 0.06), transparent 44%)",
          color: "#F5F5F5",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "9999px",
                backgroundColor: "#f97316",
              }}
            />
            AI VOICE INFRASTRUCTURE
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            miralas.io
          </div>
        </div>

        {/* Center headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "940px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.055em",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Give intelligence</span>
            <span style={{ color: "rgba(255,255,255,0.68)" }}>a natural voice.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.62)",
              maxWidth: "820px",
            }}
          >
            {`Multilingual speech technology powered by Chatterbox — ${MODEL_LANGUAGES.length} model-supported languages, with native Uzbek speech in development.`}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
              }}
            >
              Miralas
            </div>
            <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.42)" }}>
              by Miransas
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "17px",
              color: "rgba(255,255,255,0.58)",
            }}
          >
            <span>24 kHz PCM16</span>
            <span>•</span>
            <span>Rust + Python gRPC</span>
            <span>•</span>
            <span>Uzbek In Development</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
