import { BiblePassage, Translation } from "@/types/bible";

const BASE_URL = "https://bible-api.com";

export async function fetchPassage(
  book: string,
  chapter: number,
  translation: Translation
): Promise<BiblePassage> {
  const ref = `${book}+${chapter}`;
  const url = `${BASE_URL}/${ref}?translation=${translation}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Bible API error: ${res.status}`);

  const data = await res.json();
  return data as BiblePassage;
}

export async function fetchVerses(
  book: string,
  chapter: number,
  startVerse: number,
  endVerse: number,
  translation: Translation
): Promise<BiblePassage> {
  const ref =
    startVerse === endVerse
      ? `${book}+${chapter}:${startVerse}`
      : `${book}+${chapter}:${startVerse}-${endVerse}`;
  const url = `${BASE_URL}/${ref}?translation=${translation}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Bible API error: ${res.status}`);

  return res.json() as Promise<BiblePassage>;
}
