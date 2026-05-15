import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SelahPath™ — Deep Bible Study",
  description:
    "Read scripture deeply. Select verses to unlock AI-powered analysis across Original Languages, PaRDeS levels, and Myron's Four Levels of understanding.",
  keywords: ["Bible study", "Scripture", "PaRDeS", "Hebrew", "Greek", "AI analysis"],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
