import BibleReader from "@/components/BibleReader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read — Selah",
  description: "Read and study the Bible with deep AI-powered analysis.",
};

export default function ReadPage() {
  return <BibleReader />;
}
