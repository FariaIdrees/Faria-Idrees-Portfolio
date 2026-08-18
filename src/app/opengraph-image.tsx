import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

const STACK = ["React", "Next.js", "Node.js", "Express", "MongoDB"];

/** Social share card, rendered at build time from the same content source. */
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
          padding: "72px 80px",
          background: "#07080c",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(90,122,255,0.30), transparent 45%), radial-gradient(circle at 88% 92%, rgba(34,211,238,0.16), transparent 45%)",
          color: "#edeff5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#7593ff",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7d8499",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 36,
              color: "#a0a7ba",
              letterSpacing: "-0.01em",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {STACK.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                fontSize: 22,
                color: "#a0a7ba",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
