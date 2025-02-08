import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { schema } from "@/lib/methods/schema";

const model = anthropic("claude-3-5-sonnet-20240620");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    const { object } = await generateObject({
      model,
      system: "You will receive a resume. Please extract the data from the resume.",
      schema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "file",
              data: buffer,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { error: "Failed to process resume" },
      { status: 500 }
    );
  }
} 