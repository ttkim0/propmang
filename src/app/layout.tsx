import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arid - AI-Native Property Management",
  description:
    "The intelligent property management platform that automates your workflow with AI-powered insights, maintenance triage, and financial forecasting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
