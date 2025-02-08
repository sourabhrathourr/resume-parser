"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractDataFromResume } from "@/lib/methods/extract-data";
import type { ResumeData, Project, Experience, Education } from "@/lib/types";
import "@/styles/scrollbar.css";

export function ResumeParser() {
  const [result, setResult] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      const iframe = document.getElementById(
        "resume-preview",
      ) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = fileUrl;
      }
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await extractDataFromResume(
        selectedFile || "sourabhrathour.pdf",
      );
      setResult(data);
    } catch (error) {
      console.error("Error extracting data:", error);
      alert("Failed to parse resume. Please try again or contact support if the issue persists.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedFile(null);
    const iframe = document.getElementById(
      "resume-preview",
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.src = "/sourabhrathour.pdf";
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Only show file upload when not loading and no results */}
        {!loading && !result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-300">
                Resume File
              </label>
              {selectedFile && (
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    const iframe = document.getElementById(
                      "resume-preview",
                    ) as HTMLIFrameElement;
                    if (iframe) {
                      iframe.src = "/sourabhrathour.pdf";
                    }
                  }}
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Use Default Resume
                </button>
              )}
            </div>
            <div className="relative group">
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full h-full min-h-[80px] border-2 border-dashed border-neutral-800 rounded-lg flex items-center justify-center bg-neutral-900/50 group-hover:border-neutral-700 transition-colors">
                <div className="text-center px-4 py-6">
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300">
                    {selectedFile ? (
                      <span className="text-white">{selectedFile.name}</span>
                    ) : (
                      <>
                        <span className="text-white">Choose a PDF file</span> or
                        drag and drop
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Currently using:{" "}
                    {selectedFile ? "Custom Resume" : "Default Resume"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button - Only show if no results and not loading */}
        {!result && !loading && (
          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              className="bg-white hover:bg-neutral-100 text-neutral-900 px-8 py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
            >
              Generate Profile
            </Button>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-neutral-800 border-t-white animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-neutral-950" />
                </div>
              </div>
              <div className="text-neutral-200 font-medium">
                Extracting Data...
              </div>
            </div>
          </div>
        )}

        {/* Results with Reset Button */}
        {result && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleReset}
                className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
            </div>
            <Tabs defaultValue="formatted" className="w-full">
              <TabsList className="w-full bg-neutral-900 border border-neutral-800">
                <TabsTrigger
                  value="formatted"
                  className="w-full data-[state=active]:bg-neutral-800"
                >
                  Formatted
                </TabsTrigger>
                <TabsTrigger
                  value="json"
                  className="w-full data-[state=active]:bg-neutral-800"
                >
                  JSON
                </TabsTrigger>
              </TabsList>

              <TabsContent value="formatted" className="mt-4">
                <div className="space-y-4">
                  {/* Personal Details */}
                  <Section title="Personal Details">
                    <InfoItem
                      label="Name"
                      value={result.personalDetails.name}
                    />
                    <InfoItem
                      label="Email"
                      value={result.personalDetails.email}
                    />
                    <InfoItem
                      label="Phone"
                      value={result.personalDetails.phone}
                    />
                    <InfoItem
                      label="LinkedIn"
                      value={result.personalDetails.linkedin}
                    />
                    <InfoItem
                      label="GitHub"
                      value={result.personalDetails.github}
                    />
                  </Section>

                  {/* Education */}
                  <Section title="Education">
                    {result.education.map((edu: Education, index: number) => (
                      <div
                        key={index}
                        className="border-l-2 border-white/10 pl-4 mb-4 last:mb-0"
                      >
                        <h4 className="font-semibold text-neutral-200">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-neutral-400">
                          {edu.institution} • {edu.location}
                        </p>
                        <p className="text-sm text-neutral-400">
                          {edu.duration} {edu.gpa && `• GPA: ${edu.gpa}`}
                        </p>
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="mt-2 list-disc list-inside text-sm text-neutral-400">
                            {edu.highlights.map(
                              (highlight: string, idx: number) => (
                                <li key={idx}>{highlight}</li>
                              ),
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </Section>

                  {/* Technical Skills */}
                  <Section title="Technical Skills">
                    <SkillsList
                      title="Languages & Frameworks"
                      items={result.technicalSkills.languagesFrameworks}
                    />
                    <SkillsList
                      title="Databases & ORMs"
                      items={result.technicalSkills.databasesORMs}
                    />
                    <SkillsList
                      title="Backend Technologies"
                      items={result.technicalSkills.backendTechnologies}
                    />
                    <SkillsList
                      title="Developer Tools"
                      items={result.technicalSkills.developerTools}
                    />
                  </Section>

                  {/* Projects */}
                  <Section title="Projects">
                    {result.projects.map((project: Project, index: number) => (
                      <div
                        key={index}
                        className="border-l-2 border-white/10 pl-4 mb-6 last:mb-0"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-neutral-200">
                            {project.name}
                          </h4>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-white hover:text-neutral-300 transition-colors"
                            >
                              View Project →
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1">
                          {project.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.technologies.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-white/5 text-neutral-300 rounded-full border border-white/10"
                              >
                                {tech}
                              </span>
                            ),
                          )}
                        </div>
                        <ul className="mt-2 list-disc list-inside text-sm text-neutral-400">
                          {project.highlights.map(
                            (highlight: string, idx: number) => (
                              <li key={idx}>{highlight}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </Section>

                  {/* Experience */}
                  <Section title="Experience">
                    {result.experience.map((exp: Experience, index: number) => (
                      <div
                        key={index}
                        className="border-l-2 border-white/10 pl-4 mb-4 last:mb-0"
                      >
                        <h4 className="font-semibold text-neutral-200">
                          {exp.position} at {exp.company}
                        </h4>
                        <p className="text-sm text-neutral-400">
                          {exp.duration} • {exp.location}
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm text-neutral-400">
                          {exp.responsibilities.map(
                            (resp: string, idx: number) => (
                              <li key={idx}>{resp}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </Section>
                </div>
              </TabsContent>

              <TabsContent value="json" className="mt-4">
                <Section title="Raw JSON">
                  <pre className="bg-neutral-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-neutral-200 font-mono whitespace-pre-wrap break-words">
                      {JSON.stringify(result, null, 2)}
                    </code>
                  </pre>
                </Section>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm rounded-lg p-4 border border-neutral-800/50">
      <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-neutral-400">{label}:</span>
      <span className="text-sm text-neutral-200">{value}</span>
    </div>
  );
}

function SkillsList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mb-3 last:mb-0">
      <h4 className="text-sm font-medium text-neutral-300 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-white/5 text-neutral-300 rounded-full border border-white/10"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
