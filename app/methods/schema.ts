import { z } from "zod";

export const schema = z.object({
  personalDetails: z
    .object({
      name: z.string().describe("Full name of the candidate"),
      phone: z.string().optional().describe("Phone number of the candidate"),
      email: z.string().email().describe("Email address of the candidate"),
      linkedin: z.string().url().optional().describe("LinkedIn profile URL"),
      github: z.string().url().optional().describe("GitHub profile URL"),
    })
    .describe("Personal details of the candidate"),

  education: z
    .array(
      z.object({
        degree: z.string().describe("Name of the degree/certification"),
        institution: z.string().describe("Name of the institution"),
        duration: z.string().describe("Time period of education"),
        location: z.string().describe("Location of the institution"),
        gpa: z.string().optional().describe("GPA or academic performance"),
        highlights: z
          .array(z.string())
          .optional()
          .describe("Key academic achievements or relevant coursework"),
      })
    )
    .describe("Educational background"),

  technicalSkills: z
    .object({
      languagesFrameworks: z
        .array(z.string())
        .optional()
        .describe("Programming languages and frameworks known"),
      databasesORMs: z
        .array(z.string())
        .optional()
        .describe("Databases and ORM technologies used"),
      backendTechnologies: z
        .array(z.string())
        .optional()
        .describe("Backend-related technologies used"),
      developerTools: z
        .array(z.string())
        .optional()
        .describe("Development tools, IDEs, and version control"),
    })
    .describe("List of technical skills"),

  projects: z
    .array(
      z.object({
        name: z.string().describe("Name of the project"),
        description: z.string().describe("Brief description of the project"),
        technologies: z
          .array(z.string())
          .describe("Technologies used in the project"),
        link: z
          .string()
          .url()
          .optional()
          .describe("Project URL or repository link"),
        highlights: z
          .array(z.string())
          .describe("Key features or achievements of the project"),
      })
    )
    .describe("Notable projects"),

  experience: z
    .array(
      z.object({
        company: z.string().describe("Name of the company"),
        position: z.string().describe("Job title or role"),
        duration: z.string().describe("Time period of employment"),
        location: z
          .string()
          .describe("Work location (or 'Remote' if applicable)"),
        responsibilities: z
          .array(z.string())
          .describe("Key tasks and responsibilities handled in the role"),
      }),
    )
    .describe("Work experience details"),
});
