import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1730",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 40 40">
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
      </div>
    ),
    size,
  );
}
