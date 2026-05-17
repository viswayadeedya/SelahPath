import { NextRequest, NextResponse } from "next/server";
import { Translation, BOOKS } from "@/types/bible";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");
  const translation = (searchParams.get("translation") || "kjv") as Translation;

  if (!book || !chapter) {
    return NextResponse.json({ error: "Missing book or chapter" }, { status: 400 });
  }

  // IRVTel is stored in Supabase, not bible-api.com
  if (translation === "irvtel") {
    try {
      const supabase = getSupabaseClient();
      // Table stores capitalized full names (e.g. "John"), not lowercase IDs (e.g. "john")
      const bookName = BOOKS.find((b) => b.id === book)?.name ?? book;
      const { data, error } = await supabase
        .from("bible_verses")
        .select("verse, text")
        .eq("translation", "IRVTel")
        .eq("book", bookName)
        .eq("chapter", parseInt(chapter))
        .order("verse", { ascending: true });

      if (error) throw error;
      if (!data || data.length === 0) {
        return NextResponse.json({ error: "Passage not found" }, { status: 404 });
      }

      const chapterNum = parseInt(chapter);
      return NextResponse.json({
        reference: `${book} ${chapter}`,
        translation_id: "irvtel",
        translation_name: "Telugu Indian Revised Version",
        text: data.map((v) => v.text).join(" "),
        verses: data.map((v) => ({
          book_id: book,
          book_name: book,
          chapter: chapterNum,
          verse: v.verse,
          text: v.text,
        })),
      });
    } catch (error) {
      console.error("IRVTel Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch Telugu passage" }, { status: 500 });
    }
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
