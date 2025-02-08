import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resume Parser";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #09090b, #18181b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Resume Parser
        </h1>
        <p
          style={{
            fontSize: 30,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Transform your PDF resume into structured data using AI
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
} 