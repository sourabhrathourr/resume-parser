import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { schema } from "@/lib/methods/schema";
import { ZodError } from "zod";

export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("Missing ANTHROPIC_API_KEY environment variable");
}

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

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    
    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json(
        { error: "Empty file provided" },
        { status: 400 }
      );
    }

    try {
      const { object } = await generateObject({
        model,
        system: `You are a professional resume parser. Your task is to extract structured data from the provided resume.
                Follow these guidelines:
                - Extract all relevant information that matches the schema
                - Ensure all required fields are filled
                - Use arrays for multiple items (skills, experiences, etc.)
                - Keep descriptions concise but informative
                - Maintain proper formatting for dates and durations
                - Include all technical skills mentioned
                - Extract both explicit and implicit information
                Parse the resume completely and accurately.`,
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

      if (!object) {
        throw new Error("No data generated from resume");
      }

      // Validate the object against the schema
      const validatedData = schema.parse(object);
      
      return NextResponse.json({ data: validatedData });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: "Invalid resume data format: " + error.message },
          { status: 422 }
        );
      }
      throw error; // Re-throw other errors
    }
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : "Failed to process resume. Please ensure the PDF is properly formatted."
      },
      { status: 500 }
    );
  }
} 