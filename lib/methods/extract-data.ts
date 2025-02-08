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
  let fileData;
  
  if (typeof resumePath === "string") {
    const absolutePath = path.join(process.cwd(), 'public', resumePath);
    fileData = readFileSync(absolutePath);
  } else {
    fileData = await resumePath.arrayBuffer();
  }

  const { object } = await generateObject({
    model,
    system:
      `You will receive a resume. ` +
      `Please extract the data from the resume.`,
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
};
