export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BiblePassage {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
}

export interface SelectedVerse {
  verseNumber: number;
  text: string;
  reference: string;
}

export interface OriginalLanguageWord {
  word: string;
  transliteration: string;
  strongs: string;
  literal: string;
  contextual: string;
}

export interface PaRDeS {
  peshat: string;
  remez: string;
  derash: string;
  sod: string;
}

export interface FourLevelsPrinciples {
  law: string;
  positive: string;
  negative: string;
}

export interface FourLevelsEssence {
  character: string;
  reflection: string;
  embodiment: string;
}

export interface FourLevels {
  tactics: string;
  strategy: string;
  principles: FourLevelsPrinciples;
  essence: FourLevelsEssence;
}

export interface VerseAnalysis {
  original_languages: OriginalLanguageWord[];
  pardes: PaRDeS;
  four_levels: FourLevels;
  deep_reading: string;
}

export type Translation = "kjv" | "web" | "bbe" | "clementine" | "almeida";

export interface TranslationOption {
  id: Translation;
  label: string;
  fullName: string;
}

export const TRANSLATIONS: TranslationOption[] = [
  { id: "kjv", label: "KJV", fullName: "King James Version" },
  { id: "web", label: "WEB", fullName: "World English Bible" },
  { id: "bbe", label: "BBE", fullName: "Bible in Basic English" },
];

export const BOOKS = [
  { id: "genesis", name: "Genesis", chapters: 50, testament: "OT" },
  { id: "exodus", name: "Exodus", chapters: 40, testament: "OT" },
  { id: "leviticus", name: "Leviticus", chapters: 27, testament: "OT" },
  { id: "numbers", name: "Numbers", chapters: 36, testament: "OT" },
  { id: "deuteronomy", name: "Deuteronomy", chapters: 34, testament: "OT" },
  { id: "joshua", name: "Joshua", chapters: 24, testament: "OT" },
  { id: "judges", name: "Judges", chapters: 21, testament: "OT" },
  { id: "ruth", name: "Ruth", chapters: 4, testament: "OT" },
  { id: "1+samuel", name: "1 Samuel", chapters: 31, testament: "OT" },
  { id: "2+samuel", name: "2 Samuel", chapters: 24, testament: "OT" },
  { id: "1+kings", name: "1 Kings", chapters: 22, testament: "OT" },
  { id: "2+kings", name: "2 Kings", chapters: 25, testament: "OT" },
  { id: "1+chronicles", name: "1 Chronicles", chapters: 29, testament: "OT" },
  { id: "2+chronicles", name: "2 Chronicles", chapters: 36, testament: "OT" },
  { id: "ezra", name: "Ezra", chapters: 10, testament: "OT" },
  { id: "nehemiah", name: "Nehemiah", chapters: 13, testament: "OT" },
  { id: "esther", name: "Esther", chapters: 10, testament: "OT" },
  { id: "job", name: "Job", chapters: 42, testament: "OT" },
  { id: "psalms", name: "Psalms", chapters: 150, testament: "OT" },
  { id: "proverbs", name: "Proverbs", chapters: 31, testament: "OT" },
  { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12, testament: "OT" },
  { id: "song+of+solomon", name: "Song of Solomon", chapters: 8, testament: "OT" },
  { id: "isaiah", name: "Isaiah", chapters: 66, testament: "OT" },
  { id: "jeremiah", name: "Jeremiah", chapters: 52, testament: "OT" },
  { id: "lamentations", name: "Lamentations", chapters: 5, testament: "OT" },
  { id: "ezekiel", name: "Ezekiel", chapters: 48, testament: "OT" },
  { id: "daniel", name: "Daniel", chapters: 12, testament: "OT" },
  { id: "hosea", name: "Hosea", chapters: 14, testament: "OT" },
  { id: "joel", name: "Joel", chapters: 3, testament: "OT" },
  { id: "amos", name: "Amos", chapters: 9, testament: "OT" },
  { id: "obadiah", name: "Obadiah", chapters: 1, testament: "OT" },
  { id: "jonah", name: "Jonah", chapters: 4, testament: "OT" },
  { id: "micah", name: "Micah", chapters: 7, testament: "OT" },
  { id: "nahum", name: "Nahum", chapters: 3, testament: "OT" },
  { id: "habakkuk", name: "Habakkuk", chapters: 3, testament: "OT" },
  { id: "zephaniah", name: "Zephaniah", chapters: 3, testament: "OT" },
  { id: "haggai", name: "Haggai", chapters: 2, testament: "OT" },
  { id: "zechariah", name: "Zechariah", chapters: 14, testament: "OT" },
  { id: "malachi", name: "Malachi", chapters: 4, testament: "OT" },
  { id: "matthew", name: "Matthew", chapters: 28, testament: "NT" },
  { id: "mark", name: "Mark", chapters: 16, testament: "NT" },
  { id: "luke", name: "Luke", chapters: 24, testament: "NT" },
  { id: "john", name: "John", chapters: 21, testament: "NT" },
  { id: "acts", name: "Acts", chapters: 28, testament: "NT" },
  { id: "romans", name: "Romans", chapters: 16, testament: "NT" },
  { id: "1+corinthians", name: "1 Corinthians", chapters: 16, testament: "NT" },
  { id: "2+corinthians", name: "2 Corinthians", chapters: 13, testament: "NT" },
  { id: "galatians", name: "Galatians", chapters: 6, testament: "NT" },
  { id: "ephesians", name: "Ephesians", chapters: 6, testament: "NT" },
  { id: "philippians", name: "Philippians", chapters: 4, testament: "NT" },
  { id: "colossians", name: "Colossians", chapters: 4, testament: "NT" },
  { id: "1+thessalonians", name: "1 Thessalonians", chapters: 5, testament: "NT" },
  { id: "2+thessalonians", name: "2 Thessalonians", chapters: 3, testament: "NT" },
  { id: "1+timothy", name: "1 Timothy", chapters: 6, testament: "NT" },
  { id: "2+timothy", name: "2 Timothy", chapters: 4, testament: "NT" },
  { id: "titus", name: "Titus", chapters: 3, testament: "NT" },
  { id: "philemon", name: "Philemon", chapters: 1, testament: "NT" },
  { id: "hebrews", name: "Hebrews", chapters: 13, testament: "NT" },
  { id: "james", name: "James", chapters: 5, testament: "NT" },
  { id: "1+peter", name: "1 Peter", chapters: 5, testament: "NT" },
  { id: "2+peter", name: "2 Peter", chapters: 3, testament: "NT" },
  { id: "1+john", name: "1 John", chapters: 5, testament: "NT" },
  { id: "2+john", name: "2 John", chapters: 1, testament: "NT" },
  { id: "3+john", name: "3 John", chapters: 1, testament: "NT" },
  { id: "jude", name: "Jude", chapters: 1, testament: "NT" },
  { id: "revelation", name: "Revelation", chapters: 22, testament: "NT" },
];
