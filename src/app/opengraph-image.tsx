import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Read once at module scope; the asset does not depend on the request.
const logoData = await readFile(
  join(process.cwd(), "src/assets/brand/logo-on-dark.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

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
        <img src={logoSrc} alt="" width={181} height={140} />

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
