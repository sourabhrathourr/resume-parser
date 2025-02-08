import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Parser - Extract Data from PDF Resumes",
  description:
    "Transform your PDF resume into structured data using AI. Parse resumes efficiently with our modern resume parsing tool powered by Claude AI.",
  keywords:
    "resume parser, PDF parser, AI resume analysis, CV parser, resume data extraction",
  authors: [{ name: "Sourabh Rathour" }],
  openGraph: {
    title: "Resume Parser - Extract Data from PDF Resumes",
    description:
      "Transform your PDF resume into structured data using AI. Parse resumes efficiently with our modern resume parsing tool.",
    url: "https://resume-parser-letraz.vercel.app",
    siteName: "Resume Parser",
    images: [
      {
        url: "/letraz.jpeg",
        width: 1200,
        height: 630,
        alt: "Resume Parser Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950`}
      >
        {children}
      </body>
    </html>
  );
}
