import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

async function getFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
        },
      }
    ).then((r) => r.text());
    const url = css.match(/url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    return fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Icon() {
  const fontData = await getFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F4F0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: fontData ? "Space Mono" : "monospace",
            fontSize: 26,
            color: "#1A1A1A",
            letterSpacing: "0.15em",
          }}
        >
          JU
        </span>
      </div>
    ),
    {
      width: 64,
      height: 64,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Space Mono",
                data: fontData,
                style: "normal",
                weight: 400,
              },
            ],
          }
        : {}),
    }
  );
}
