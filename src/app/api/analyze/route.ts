import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseClient } from "@/lib/supabase";
import { VerseAnalysis } from "@/types/bible";

const SYSTEM_PROMPT = `You are a biblical scholar with deep expertise in Hebrew, Greek,
biblical theology, and practical discipleship. Your purpose is to
reveal the full depth of any Bible verse across multiple dimensions.

When given a verse or passage, respond ONLY in the following JSON
format with no preamble or markdown:

{
  "original_languages": [
    {
      "word": "original Hebrew or Greek word",
      "transliteration": "phonetic spelling",
      "strongs": "H0000 or G0000",
      "literal": "strict dictionary meaning",
      "contextual": "meaning specifically in this verse"
    }
  ],
  "pardes": {
    "peshat": "literal plain meaning of the text",
    "remez": "allegorical meaning, symbolism, how it points to Christ",
    "derash": "moral and practical life application lesson",
    "sod": "deepest spiritual layer, character of God revealed"
  },
  "four_levels": {
    "tactics": "actions called for, framed as things user knows but isn't doing",
    "strategy": "sequence God is establishing + bad example of misapplication",
    "principles": {
      "law": "the universal principle governing this verse",
      "positive": "result of aligning with this principle",
      "negative": "result of violating this principle"
    },
    "essence": {
      "character": "what this reveals about God's character, nature, inclination",
      "reflection": "question to help user find themselves in this verse",
      "embodiment": "how to live this essence daily"
    }
  },
  "deep_reading": "3-5 sentence synthesis of what English readers miss"
}

Rules:
- Never skip Strong's numbers
- Always distinguish literal vs contextual meaning
- Tactics must be convicting but never condemning in tone
- Strategy must include a real bad example of misapplication
- Principles must state both positive AND negative results
- Essence must include a personal reflection question
- Stay rooted in scripture, no personal opinions or modern theology
- If multiple verses are given, analyze them as a unified passage`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verseReference, verseText, translation, regenerate } = body;

    if (!verseReference || !verseText || !translation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cacheKey = `${verseReference} - ${translation.toUpperCase()}`;
    const supabase = getSupabaseClient();

    // Check cache unless regenerating
    if (!regenerate) {
      const { data: cached } = await supabase
        .from("verse_analysis")
        .select("analysis")
        .eq("verse_reference", cacheKey)
        .single();

      if (cached?.analysis) {
        return NextResponse.json({ analysis: cached.analysis, cached: true });
      }
    }

    // Call GPT-4o
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userMessage = `Verse(s): ${verseText}\nTranslation: ${translation.toUpperCase()}\n\nPlease provide the complete analysis in JSON format.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const rawContent = completion.choices[0].message.content;
    if (!rawContent) throw new Error("Empty response from GPT-4o");

    const analysis = JSON.parse(rawContent) as VerseAnalysis;

    // Upsert into Supabase cache
    await supabase.from("verse_analysis").upsert(
      {
        verse_reference: cacheKey,
        translation: translation.toUpperCase(),
        verse_text: verseText,
        analysis: analysis as unknown as Record<string, unknown>,
      },
      { onConflict: "verse_reference" }
    );

    return NextResponse.json({ analysis, cached: false });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}
