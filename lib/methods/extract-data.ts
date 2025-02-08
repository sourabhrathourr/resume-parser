"use server";

import { readFileSync } from "fs";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { schema } from "./schema";
import path from "path";

export async function generateProfile() {
  return {
    name: "Sourabh Rathour",
    email: "rathoursourabh5@gmail.com",
  };
}

const model = anthropic("claude-3-5-sonnet-20240620");

export const extractDataFromResume = async (resumePath: string | File) => {
  try {
    let fileData;
    
    if (typeof resumePath === "string") {
      try {
        const absolutePath = path.join(process.cwd(), 'public', resumePath);
        fileData = readFileSync(absolutePath);
      } catch (error) {
        console.error("Error reading file:", error);
        throw new Error("Failed to read resume file");
      }
    } else {
      try {
        fileData = await resumePath.arrayBuffer();
      } catch (error) {
        console.error("Error reading uploaded file:", error);
        throw new Error("Failed to read uploaded file");
      }
    }

    if (!fileData) {
      throw new Error("No file data available");
    }

    try {
      const { object } = await generateObject({
        model,
        system: `You will receive a resume. Please extract the data from the resume.`,
        schema,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "file",
                data: fileData,
                mimeType: "application/pdf",
              },
            ],
          },
        ],
      });
      return object;
    } catch (error) {
      console.error("Error generating object:", error);
      throw new Error("Failed to parse resume data");
    }
  } catch (error) {
    console.error("Extract data error:", error);
    throw error;
  }
};
