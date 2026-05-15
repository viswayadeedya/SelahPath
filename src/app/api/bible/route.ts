import { NextRequest, NextResponse } from "next/server";
import { Translation } from "@/types/bible";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");
  const translation = (searchParams.get("translation") || "kjv") as Translation;

  if (!book || !chapter) {
    return NextResponse.json({ error: "Missing book or chapter" }, { status: 400 });
  }

  try {
    const ref = `${book}+${chapter}`;
    const url = `https://bible-api.com/${ref}?translation=${translation}`;

    const res = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Bible API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Bible API error:", error);
    return NextResponse.json({ error: "Failed to fetch Bible passage" }, { status: 500 });
  }
}
