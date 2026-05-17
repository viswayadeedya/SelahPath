import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SelahPath™ — Deep Bible Study",
  description:
    "Read scripture deeply. Select verses to unlock AI-powered analysis across Original Languages, PaRDeS levels, and the Four Levels of understanding.",
  keywords: ["Bible study", "Scripture", "PaRDeS", "Hebrew", "Greek", "AI analysis"],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
