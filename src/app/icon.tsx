import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon, generated at build time so no binary asset is checked in. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1020 0%, #131a33 100%)",
          color: "#7593ff",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          borderRadius: 14,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}
