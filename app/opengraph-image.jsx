import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 10% 15%, rgba(79,70,229,0.5), transparent 45%), radial-gradient(circle at 90% 90%, rgba(6,182,212,0.45), transparent 45%), radial-gradient(circle at 80% 10%, rgba(124,58,237,0.4), transparent 40%), #050816",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#0A0F2B",
              border: "2px solid rgba(124,58,237,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#06B6D4",
            }}
          >
            Y
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>
            Yug<span style={{ color: "#06B6D4" }}>Nirman</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 66, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            Building the Next Era
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, color: "#06B6D4", lineHeight: 1.1 }}>
            Through Technology
          </div>
          <div style={{ fontSize: 26, color: "#A1A1AA", marginTop: 18 }}>
            AI &middot; Web &middot; Mobile &middot; Cloud &middot; Automation &middot; Enterprise Software
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#A1A1AA" }}>Kathmandu, Nepal — Serving clients globally</div>
      </div>
    ),
    { ...size }
  );
}
