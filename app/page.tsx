import { ResumeParser } from "@/components/resume-parser";

export default function Home() {
  return (
    <main className="h-screen bg-neutral-950">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Resume Parser
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Extract structured data from your resume in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100%-5rem)]">
          {/* PDF Preview Section */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-neutral-800/50">
            <div className="p-4 border-b border-neutral-800">
              <h2 className="text-xl font-semibold text-neutral-200">
                Resume Preview
              </h2>
            </div>
            <div className="h-[calc(100%-4rem)] p-4">
              <iframe
                id="resume-preview"
                src="/sourabhrathour.pdf"
                className="w-full h-full rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Parser Section */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-neutral-800/50">
            <div className="p-4 border-b border-neutral-800">
              <h2 className="text-xl font-semibold text-neutral-200">
                Resume Parser
              </h2>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto p-4 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-800">
              <ResumeParser />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
