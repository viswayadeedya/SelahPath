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
  root?: string;
  letter_breakdown?: string;
}

export interface ProperNoun {
  name: string;
  hebrew_meaning: string;
  cultural_significance: string;
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
  proper_nouns?: ProperNoun[];
  pardes: PaRDeS;
  four_levels: FourLevels;
  deep_reading: string;
}

export type Translation = "kjv" | "web" | "bbe" | "clementine" | "almeida" | "irvtel";

export interface TranslationOption {
  id: Translation;
  label: string;
  fullName: string;
  nativeName?: string;
}

export const TRANSLATIONS: TranslationOption[] = [
  { id: "kjv", label: "KJV", fullName: "King James Version" },
  { id: "web", label: "WEB", fullName: "World English Bible" },
  { id: "bbe", label: "BBE", fullName: "Bible in Basic English" },
  { id: "irvtel", label: "IRVTel", fullName: "Telugu Indian Revised Version", nativeName: "తెలుగు ఇండియన్ రివైజ్డ్ వెర్షన్" },
];

export const BOOKS = [
  { id: "genesis", name: "Genesis", teluguName: "ఆదికాండము", chapters: 50, testament: "OT" },
  { id: "exodus", name: "Exodus", teluguName: "నిర్గమకాండము", chapters: 40, testament: "OT" },
  { id: "leviticus", name: "Leviticus", teluguName: "లేవీయకాండము", chapters: 27, testament: "OT" },
  { id: "numbers", name: "Numbers", teluguName: "సంఖ్యాకాండము", chapters: 36, testament: "OT" },
  { id: "deuteronomy", name: "Deuteronomy", teluguName: "ద్వితీయోపదేశకాండము", chapters: 34, testament: "OT" },
  { id: "joshua", name: "Joshua", teluguName: "యెహోషువ", chapters: 24, testament: "OT" },
  { id: "judges", name: "Judges", teluguName: "న్యాయాధిపతులు", chapters: 21, testament: "OT" },
  { id: "ruth", name: "Ruth", teluguName: "రూతు", chapters: 4, testament: "OT" },
  { id: "1+samuel", name: "1 Samuel", teluguName: "1 సమూయేలు", chapters: 31, testament: "OT" },
  { id: "2+samuel", name: "2 Samuel", teluguName: "2 సమూయేలు", chapters: 24, testament: "OT" },
  { id: "1+kings", name: "1 Kings", teluguName: "1 రాజులు", chapters: 22, testament: "OT" },
  { id: "2+kings", name: "2 Kings", teluguName: "2 రాజులు", chapters: 25, testament: "OT" },
  { id: "1+chronicles", name: "1 Chronicles", teluguName: "1 దినవృత్తాంతములు", chapters: 29, testament: "OT" },
  { id: "2+chronicles", name: "2 Chronicles", teluguName: "2 దినవృత్తాంతములు", chapters: 36, testament: "OT" },
  { id: "ezra", name: "Ezra", teluguName: "ఎజ్రా", chapters: 10, testament: "OT" },
  { id: "nehemiah", name: "Nehemiah", teluguName: "నెహెమ్యా", chapters: 13, testament: "OT" },
  { id: "esther", name: "Esther", teluguName: "ఎస్తేరు", chapters: 10, testament: "OT" },
  { id: "job", name: "Job", teluguName: "యోబు", chapters: 42, testament: "OT" },
  { id: "psalms", name: "Psalms", teluguName: "కీర్తనలు", chapters: 150, testament: "OT" },
  { id: "proverbs", name: "Proverbs", teluguName: "సామెతలు", chapters: 31, testament: "OT" },
  { id: "ecclesiastes", name: "Ecclesiastes", teluguName: "ప్రసంగి", chapters: 12, testament: "OT" },
  { id: "song+of+solomon", name: "Song of Solomon", teluguName: "పరమగీతము", chapters: 8, testament: "OT" },
  { id: "isaiah", name: "Isaiah", teluguName: "యెషయా", chapters: 66, testament: "OT" },
  { id: "jeremiah", name: "Jeremiah", teluguName: "యిర్మీయా", chapters: 52, testament: "OT" },
  { id: "lamentations", name: "Lamentations", teluguName: "విలాపవాక్యములు", chapters: 5, testament: "OT" },
  { id: "ezekiel", name: "Ezekiel", teluguName: "యెహెజ్కేలు", chapters: 48, testament: "OT" },
  { id: "daniel", name: "Daniel", teluguName: "దానియేలు", chapters: 12, testament: "OT" },
  { id: "hosea", name: "Hosea", teluguName: "హోషేయ", chapters: 14, testament: "OT" },
  { id: "joel", name: "Joel", teluguName: "యోవేలు", chapters: 3, testament: "OT" },
  { id: "amos", name: "Amos", teluguName: "ఆమోసు", chapters: 9, testament: "OT" },
  { id: "obadiah", name: "Obadiah", teluguName: "ఓబద్యా", chapters: 1, testament: "OT" },
  { id: "jonah", name: "Jonah", teluguName: "యోనా", chapters: 4, testament: "OT" },
  { id: "micah", name: "Micah", teluguName: "మీకా", chapters: 7, testament: "OT" },
  { id: "nahum", name: "Nahum", teluguName: "నహూము", chapters: 3, testament: "OT" },
  { id: "habakkuk", name: "Habakkuk", teluguName: "హబక్కూకు", chapters: 3, testament: "OT" },
  { id: "zephaniah", name: "Zephaniah", teluguName: "జెఫన్యా", chapters: 3, testament: "OT" },
  { id: "haggai", name: "Haggai", teluguName: "హగ్గయి", chapters: 2, testament: "OT" },
  { id: "zechariah", name: "Zechariah", teluguName: "జెకర్యా", chapters: 14, testament: "OT" },
  { id: "malachi", name: "Malachi", teluguName: "మలాకీ", chapters: 4, testament: "OT" },
  { id: "matthew", name: "Matthew", teluguName: "మత్తయి", chapters: 28, testament: "NT" },
  { id: "mark", name: "Mark", teluguName: "మార్కు", chapters: 16, testament: "NT" },
  { id: "luke", name: "Luke", teluguName: "లూకా", chapters: 24, testament: "NT" },
  { id: "john", name: "John", teluguName: "యోహాను", chapters: 21, testament: "NT" },
  { id: "acts", name: "Acts", teluguName: "అపొస్తలుల కార్యములు", chapters: 28, testament: "NT" },
  { id: "romans", name: "Romans", teluguName: "రోమీయులకు", chapters: 16, testament: "NT" },
  { id: "1+corinthians", name: "1 Corinthians", teluguName: "1 కొరింథీయులకు", chapters: 16, testament: "NT" },
  { id: "2+corinthians", name: "2 Corinthians", teluguName: "2 కొరింథీయులకు", chapters: 13, testament: "NT" },
  { id: "galatians", name: "Galatians", teluguName: "గలతీయులకు", chapters: 6, testament: "NT" },
  { id: "ephesians", name: "Ephesians", teluguName: "ఎఫెసీయులకు", chapters: 6, testament: "NT" },
  { id: "philippians", name: "Philippians", teluguName: "ఫిలిప్పీయులకు", chapters: 4, testament: "NT" },
  { id: "colossians", name: "Colossians", teluguName: "కొలొస్సయులకు", chapters: 4, testament: "NT" },
  { id: "1+thessalonians", name: "1 Thessalonians", teluguName: "1 థెస్సలొనీకయులకు", chapters: 5, testament: "NT" },
  { id: "2+thessalonians", name: "2 Thessalonians", teluguName: "2 థెస్సలొనీకయులకు", chapters: 3, testament: "NT" },
  { id: "1+timothy", name: "1 Timothy", teluguName: "1 తిమోతికి", chapters: 6, testament: "NT" },
  { id: "2+timothy", name: "2 Timothy", teluguName: "2 తిమోతికి", chapters: 4, testament: "NT" },
  { id: "titus", name: "Titus", teluguName: "తీతుకు", chapters: 3, testament: "NT" },
  { id: "philemon", name: "Philemon", teluguName: "ఫిలేమోనుకు", chapters: 1, testament: "NT" },
  { id: "hebrews", name: "Hebrews", teluguName: "హెబ్రీయులకు", chapters: 13, testament: "NT" },
  { id: "james", name: "James", teluguName: "యాకోబు", chapters: 5, testament: "NT" },
  { id: "1+peter", name: "1 Peter", teluguName: "1 పేతురు", chapters: 5, testament: "NT" },
  { id: "2+peter", name: "2 Peter", teluguName: "2 పేతురు", chapters: 3, testament: "NT" },
  { id: "1+john", name: "1 John", teluguName: "1 యోహాను", chapters: 5, testament: "NT" },
  { id: "2+john", name: "2 John", teluguName: "2 యోహాను", chapters: 1, testament: "NT" },
  { id: "3+john", name: "3 John", teluguName: "3 యోహాను", chapters: 1, testament: "NT" },
  { id: "jude", name: "Jude", teluguName: "యూదా", chapters: 1, testament: "NT" },
  { id: "revelation", name: "Revelation", teluguName: "ప్రకటన గ్రంథము", chapters: 22, testament: "NT" },
];
