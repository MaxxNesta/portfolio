import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/SpaceMono-Regular.ttf")
  );

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
            fontFamily: "Space Mono",
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
      fonts: [
        {
          name: "Space Mono",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
