"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Verse, BiblePassage, SelectedVerse, Translation, TRANSLATIONS, BOOKS } from "@/types/bible";
import VerseCard from "./VerseCard";
import AnalysisSidebar from "./AnalysisSidebar";
import { VerseAnalysis } from "@/types/bible";

const DEBOUNCE_MS = 800;

export default function BibleReader() {
  const [book, setBook] = useState("john");
  const [chapter, setChapter] = useState(3);
  const [translation, setTranslation] = useState<Translation>("kjv");
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [loadingPassage, setLoadingPassage] = useState(false);
  const [passageError, setPassageError] = useState<string | null>(null);

  const [selectedVerses, setSelectedVerses] = useState<SelectedVerse[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analysis, setAnalysis] = useState<VerseAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [isCached, setIsCached] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAnalyzedKey = useRef<string>("");

  const currentBook = BOOKS.find((b) => b.id === book);
  const maxChapters = currentBook?.chapters || 1;

  // Fetch passage when book/chapter/translation changes
  useEffect(() => {
    async function loadPassage() {
      setLoadingPassage(true);
      setPassageError(null);
      setSelectedVerses([]);
      setAnalysis(null);

      try {
        const res = await fetch(
          `/api/bible?book=${book}&chapter=${chapter}&translation=${translation}`
        );
        if (!res.ok) throw new Error("Failed to fetch passage");
        const data: BiblePassage = await res.json();
        setPassage(data);
      } catch {
        setPassageError("Could not load this passage. Please try again.");
      } finally {
        setLoadingPassage(false);
      }
    }

    loadPassage();
  }, [book, chapter, translation]);

  // Debounced analysis trigger
  const triggerAnalysis = useCallback(
    (verses: SelectedVerse[], regenerate = false) => {
      if (verses.length === 0) return;

      const key = verses.map((v) => v.reference).join(",") + translation;
      if (!regenerate && key === lastAnalyzedKey.current) return;

      lastAnalyzedKey.current = key;
      setSidebarOpen(true);
      setLoadingAnalysis(true);
      setAnalysis(null);

      const verseText = verses
        .map((v) => `${v.reference}: ${v.text}`)
        .join("\n");

      const reference =
        verses.length === 1
          ? verses[0].reference
          : `${verses[0].reference}-${verses[verses.length - 1].reference.split(":")[1]}`;

      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verseReference: reference,
          verseText,
          translation,
          regenerate,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setAnalysis(data.analysis);
          setIsCached(data.cached);
        })
        .catch(() => {
          setAnalysis(null);
        })
        .finally(() => setLoadingAnalysis(false));
    },
    [translation]
  );

  const handleVerseSelect = useCallback(
    (verse: Verse) => {
      setSelectedVerses((prev) => {
        const exists = prev.find((v) => v.verseNumber === verse.verse);
        const bookName = currentBook?.name || book;
        const ref = `${bookName} ${chapter}:${verse.verse}`;

        let next: SelectedVerse[];
        if (exists) {
          next = prev.filter((v) => v.verseNumber !== verse.verse);
        } else {
          next = [
            ...prev,
            { verseNumber: verse.verse, text: verse.text.trim(), reference: ref },
          ].sort((a, b) => a.verseNumber - b.verseNumber);
        }

        // Debounce: clear previous timer, set new one
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (next.length > 0) {
          debounceTimer.current = setTimeout(() => {
            triggerAnalysis(next);
          }, DEBOUNCE_MS);
        } else {
          setSidebarOpen(false);
        }

        return next;
      });
    },
    [book, chapter, currentBook, triggerAnalysis]
  );

  const handleRegenerate = useCallback(() => {
    lastAnalyzedKey.current = "";
    triggerAnalysis(selectedVerses, true);
  }, [selectedVerses, triggerAnalysis]);

  const handleManualAnalyze = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    lastAnalyzedKey.current = "";
    triggerAnalysis(selectedVerses, false);
  }, [selectedVerses, triggerAnalysis]);

  const isVerseSelected = (verseNum: number) =>
    selectedVerses.some((v) => v.verseNumber === verseNum);

  const chaptersArray = Array.from({ length: maxChapters }, (_, i) => i + 1);

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Main reader */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top controls */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#0d0d14] px-4 py-3">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-3">
            {/* Logo */}
            <Link href="/" className="mr-2 flex-shrink-0 font-serif text-base text-[#e8e0d0] tracking-wide hover:text-[#c9a84c] transition-colors">
              SelahPath™
            </Link>
            {/* Translation */}
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                Translation
              </label>
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value as Translation)}
                className="bg-[#1a1a2e] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white/80 font-sans focus:outline-none focus:border-amber-400/50"
              >
                {TRANSLATIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} — {t.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Book */}
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                Book
              </label>
              <select
                value={book}
                onChange={(e) => {
                  setBook(e.target.value);
                  setChapter(1);
                }}
                className="bg-[#1a1a2e] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white/80 font-sans focus:outline-none focus:border-amber-400/50 max-w-[160px]"
              >
                <optgroup label="Old Testament">
                  {BOOKS.filter((b) => b.testament === "OT").map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="New Testament">
                  {BOOKS.filter((b) => b.testament === "NT").map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Chapter */}
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                Chapter
              </label>
              <select
                value={chapter}
                onChange={(e) => setChapter(Number(e.target.value))}
                className="bg-[#1a1a2e] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white/80 font-sans focus:outline-none focus:border-amber-400/50"
              >
                {chaptersArray.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter nav */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setChapter((c) => Math.max(1, c - 1))}
                disabled={chapter <= 1}
                className="px-2.5 py-1.5 rounded-md border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-colors text-xs font-sans"
              >
                ← Prev
              </button>
              <button
                onClick={() => setChapter((c) => Math.min(maxChapters, c + 1))}
                disabled={chapter >= maxChapters}
                className="px-2.5 py-1.5 rounded-md border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-colors text-xs font-sans"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Chapter heading */}
        <div className="flex-shrink-0 text-center py-6 px-4 border-b border-white/5">
          <h1 className="font-serif text-2xl text-parchment">
            {currentBook?.name} {chapter}
          </h1>
          <p className="text-xs text-white/30 font-sans mt-1 uppercase tracking-widest">
            {TRANSLATIONS.find((t) => t.id === translation)?.fullName}
          </p>
        </div>

        {/* Verses */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            {loadingPassage ? (
              <div className="space-y-3 animate-pulse">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-3 bg-white/10 rounded flex-shrink-0 mt-1" />
                    <div
                      className="h-3 bg-white/5 rounded"
                      style={{ width: `${60 + Math.random() * 40}%` }}
                    />
                  </div>
                ))}
              </div>
            ) : passageError ? (
              <div className="text-center py-20">
                <p className="text-red-400/70 text-sm font-serif">{passageError}</p>
              </div>
            ) : passage ? (
              <div className="text-[#e8e0d0] text-[1.05rem] leading-[2] font-serif">
                {passage.verses.map((verse) => (
                  <VerseCard
                    key={verse.verse}
                    verse={verse}
                    isSelected={isVerseSelected(verse.verse)}
                    onSelect={handleVerseSelect}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Floating analyze button */}
        {selectedVerses.length > 0 && (
          <div className="flex-shrink-0 flex justify-center pb-4 pt-2 lg:hidden">
            <button
              onClick={handleManualAnalyze}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-[#0a0a0f] font-sans font-semibold text-sm shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-colors"
            >
              ✦ Analyze {selectedVerses.length} verse{selectedVerses.length > 1 ? "s" : ""}
            </button>
          </div>
        )}

        {selectedVerses.length > 0 && (
          <div
            className="hidden lg:flex flex-shrink-0 justify-center pb-3 pt-1"
          >
            <p className="text-xs text-white/20 font-sans">
              {selectedVerses.length} verse{selectedVerses.length > 1 ? "s" : ""} selected
              {" · "}
              <button
                onClick={handleManualAnalyze}
                className="text-amber-400/60 hover:text-amber-400 transition-colors underline"
              >
                analyze now
              </button>
              {" · "}
              <button
                onClick={() => {
                  if (debounceTimer.current) clearTimeout(debounceTimer.current);
                  setSelectedVerses([]);
                  setSidebarOpen(false);
                }}
                className="text-white/20 hover:text-white/40 transition-colors underline"
              >
                clear
              </button>
            </p>
          </div>
        )}
      </main>

      {/* Sidebar */}
      <AnalysisSidebar
        isOpen={sidebarOpen}
        isLoading={loadingAnalysis}
        analysis={analysis}
        selectedVerses={selectedVerses}
        isCached={isCached}
        onClose={() => setSidebarOpen(false)}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
