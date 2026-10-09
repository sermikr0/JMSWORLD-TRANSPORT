import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#0a1730",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="76" height="76" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="8" fill="#163061" />
            <path
              d="M8 11h4M16 11h10"
              fill="none"
              stroke="#5f8ff7"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M26 11v11a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 700,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              <span>JMS</span>
              <span style={{ color: "#5f8ff7" }}>WORLD</span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 16,
                letterSpacing: 6,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              TRANSPORT LLC
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            Moving Freight.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            Building Trust.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
            fontSize: 22,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>Norwood, Ohio</span>
          <span>
            USDOT {site.usdot} · MC {site.mc}
          </span>
          <span>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
