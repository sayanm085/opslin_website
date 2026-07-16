import { ImageResponse } from "next/og";
import { ogPalette } from "@/lib/og-palette";

export const alt = "Opslin managed control plane connecting to a customer-controlled VPS";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: ogPalette.canvas,
          color: ogPalette.text,
          fontFamily: "Geist, Arial, sans-serif",
          padding: 56,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              `radial-gradient(circle at 82% 18%, ${ogPalette.accentTint}, transparent 36%)`,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: `1px solid ${ogPalette.border}`,
            borderRadius: 32,
            background: ogPalette.surface,
            padding: 48,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>Opslin</div>
            <div
              style={{
                border: `1px solid ${ogPalette.border}`,
                borderRadius: 999,
                color: ogPalette.accent,
                fontSize: 20,
                fontWeight: 600,
                padding: "10px 18px",
              }}
            >
              Managed control plane + your VPS
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
            <div
              style={{
                margin: 0,
                fontSize: 70,
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                fontWeight: 700,
              }}
            >
              Deploy applications on infrastructure you control.
            </div>
            <p style={{ margin: 0, color: ogPalette.textMuted, fontSize: 27, lineHeight: 1.35 }}>
              Coordinate deployments and selected server operations through Opslin&apos;s outbound Go agent.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 20 }}>
            {["Customer-controlled VPS", "Provider-neutral", "Outbound agent"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  borderRadius: 999,
                  background: ogPalette.accentTint,
                  color: ogPalette.accent,
                  padding: "9px 15px",
                }}
              >
                <span style={{ color: ogPalette.accentBright }}>●</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
