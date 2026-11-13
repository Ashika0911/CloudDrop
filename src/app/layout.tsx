
import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CloudDrop — Move files. Not complexity.",
    template: "%s | CloudDrop",
  },
  description:
    "A serverless file processing and management platform. Upload, process, and manage your files through one streamlined workflow.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {
        children
      }
      </body>
    </html>
  );
}
