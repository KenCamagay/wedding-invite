import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ken & Riza | April 18, 2030",
  description:
    "A new chapter, a lifetime together. Celebrate with Ken & Riza in Batangas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}