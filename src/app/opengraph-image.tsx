import { ImageResponse } from "next/og";
import { guideSteps } from "@/data/guide";

export const alt = "Glory IOS — Установка приложений на iPhone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#f8f9fc", padding: "80px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", color: "#1769ed", fontSize: 34, fontWeight: 700, marginBottom: 44 }}>Glory IOS</div>
      <div style={{ display: "flex", color: "#1c2535", fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>Установка приложений</div>
      <div style={{ display: "flex", color: "#1769ed", fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>на iPhone</div>
      <div style={{ display: "flex", color: "#64748b", fontSize: 26, marginTop: 32 }}>{guideSteps.length} понятных шагов · Без компьютера · 5–10 минут</div>
    </div>, size,
  );
}
