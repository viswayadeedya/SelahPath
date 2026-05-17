"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Verse, BiblePassage, SelectedVerse, Translation, TRANSLATIONS, BOOKS } from "@/types/bible";
import VerseCard from "./VerseCard";
import AnalysisSidebar from "./AnalysisSidebar";
import { VerseAnalysis } from "@/types/bible";

const DEBOUNCE_MS = 800;

const SELECT_CLS =
  "bg-[#1a1a2e] border border-white/10 rounded-md px-2.5 py-2 text-xs text-white/80 font-sans focus:outline-none focus:border-amber-400/50 min-h-[44px]";

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Restore last-read position after mount (avoids SSR/hydration mismatch)
  useEffect(() => {
    const savedBook = localStorage.getItem("selah_book");
    const savedChapter = localStorage.getItem("selah_chapter");
    const savedTranslation = localStorage.getItem("selah_translation");
    if (savedBook) setBook(savedBook);
    if (savedChapter) setChapter(parseInt(savedChapter));
    if (savedTranslation) setTranslation(savedTranslation as Translation);
  }, []);

  // Persist whenever the user changes book, chapter, or translation
  // hasMounted guard prevents overwriting localStorage with defaults on the first render
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    localStorage.setItem("selah_book", book);
    localStorage.setItem("selah_chapter", String(chapter));
    localStorage.setItem("selah_translation", translation);
  }, [book, chapter, translation]);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAnalyzedKey = useRef<string>("");

  const currentBook = BOOKS.find((b) => b.id === book);
  const maxChapters = currentBook?.chapters || 1;
  const chaptersArray = Array.from({ length: maxChapters }, (_, i) => i + 1);

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
        setPassage(await res.json());
      } catch {
        setPassageError("Could not load this passage. Please try again.");
      } finally {
        setLoadingPassage(false);
      }
    }
    loadPassage();
  }, [book, chapter, translation]);

  const triggerAnalysis = useCallback(
    (verses: SelectedVerse[], regenerate = false) => {
      if (verses.length === 0) return;
      const key = verses.map((v) => v.reference).join(",") + translation;
      if (!regenerate && key === lastAnalyzedKey.current) return;

      lastAnalyzedKey.current = key;
      setSidebarOpen(true);
      setLoadingAnalysis(true);
      setAnalysis(null);

      const verseText = verses.map((v) => `${v.reference}: ${v.text}`).join("\n");
      const reference =
        verses.length === 1
          ? verses[0].reference
          : `${verses[0].reference}-${verses[verses.length - 1].reference.split(":")[1]}`;

      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verseReference: reference, verseText, translation, regenerate }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setAnalysis(data.analysis);
          setIsCached(data.cached);
        })
        .catch(() => setAnalysis(null))
        .finally(() => setLoadingAnalysis(false));
    },
    [translation]
  );

  const handleVerseSelect = useCallback(
    (verse: Verse) => {
      setSelectedVerses((prev) => {
        const exists = prev.find((v) => v.verseNumber === verse.verse);
        const bookName = translation === "irvtel"
          ? (currentBook?.teluguName || currentBook?.name || book)
          : (currentBook?.name || book);
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

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        if (next.length > 0) {
          debounceTimer.current = setTimeout(() => triggerAnalysis(next), DEBOUNCE_MS);
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

  const isVerseSelected = (n: number) => selectedVerses.some((v) => v.verseNumber === n);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0a0a0f] overflow-hidden">

      {/* ── Main reader ── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#0d0d14]">

          {/* Logo row + hamburger */}
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="font-serif text-base md:text-lg text-[#e8e0d0] tracking-wide hover:text-[#c9a84c] transition-colors"
            >
              SelahPath™
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-white/50 hover:text-white/80 transition-colors"
              aria-label="Toggle navigation"
            >
              <span className="text-xl">{mobileNavOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* Mobile nav dropdown */}
          {mobileNavOpen && (
            <div className="md:hidden border-t border-white/10 px-4 py-2 flex flex-col">
              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="font-sans text-sm text-white/60 hover:text-[#c9a84c] transition-colors min-h-[44px] flex items-center"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileNavOpen(false)}
                className="font-sans text-sm text-white/60 hover:text-[#c9a84c] transition-colors min-h-[44px] flex items-center"
              >
                About
              </Link>
            </div>
          )}

          {/* Controls row — horizontally scrollable on mobile */}
          <div className="overflow-x-auto scrollbar-none pb-3 px-4">
            <div className="flex items-center gap-3 min-w-max">

              <div className="flex items-center gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans whitespace-nowrap">
                  Translation
                </label>
                <select
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value as Translation)}
                  className={SELECT_CLS}
                >
                  {TRANSLATIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} — {t.nativeName ?? t.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                  Book
                </label>
                <select
                  value={book}
                  onChange={(e) => { setBook(e.target.value); setChapter(1); }}
                  className={`${SELECT_CLS} max-w-[140px]`}
                >
                  <optgroup label={translation === "irvtel" ? "పాత నిబంధన" : "Old Testament"}>
                    {BOOKS.filter((b) => b.testament === "OT").map((b) => (
                      <option key={b.id} value={b.id}>
                        {translation === "irvtel" ? b.teluguName : b.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={translation === "irvtel" ? "క్రొత్త నిబంధన" : "New Testament"}>
                    {BOOKS.filter((b) => b.testament === "NT").map((b) => (
                      <option key={b.id} value={b.id}>
                        {translation === "irvtel" ? b.teluguName : b.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                  Ch.
                </label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(Number(e.target.value))}
                  className={SELECT_CLS}
                >
                  {chaptersArray.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setChapter((c) => Math.max(1, c - 1))}
                  disabled={chapter <= 1}
                  className="px-3 rounded-md border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-colors text-sm font-sans min-h-[44px] min-w-[44px]"
                >
                  ←
                </button>
                <button
                  onClick={() => setChapter((c) => Math.min(maxChapters, c + 1))}
                  disabled={chapter >= maxChapters}
                  className="px-3 rounded-md border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-colors text-sm font-sans min-h-[44px] min-w-[44px]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter heading */}
        <div className="flex-shrink-0 text-center py-4 md:py-6 px-4 border-b border-white/5">
          <h1 className="font-serif text-xl md:text-2xl text-[#e8e0d0]">
            {translation === "irvtel" ? currentBook?.teluguName : currentBook?.name} {chapter}
          </h1>
          <p className="text-xs text-white/30 font-sans mt-1 uppercase tracking-widest">
            {TRANSLATIONS.find((t) => t.id === translation)?.fullName}
          </p>
        </div>

        {/* Verse content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Extra bottom padding on mobile to clear the fixed analyze button */}
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-28 md:pb-8">
            {loadingPassage ? (
              <div className="space-y-3 animate-pulse">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-3 bg-white/10 rounded flex-shrink-0 mt-1" />
                    <div className="h-3 bg-white/5 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                  </div>
                ))}
              </div>
            ) : passageError ? (
              <div className="text-center py-20">
                <p className="text-red-400/70 text-sm font-serif">{passageError}</p>
              </div>
            ) : passage ? (
              <div className={`text-[#e8e0d0] text-base md:text-[1.05rem] leading-[2.1] font-serif${translation === "irvtel" ? " telugu-verse" : ""}`}>
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

        {/* Desktop status bar */}
        {selectedVerses.length > 0 && (
          <div className="hidden md:flex flex-shrink-0 justify-center pb-3 pt-1">
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

      {/* Mobile fixed analyze button — visible when verses selected, below sidebar */}
      {selectedVerses.length > 0 && (
        <div className="md:hidden fixed bottom-6 inset-x-0 flex justify-center z-20 pointer-events-none">
          <button
            onClick={handleManualAnalyze}
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-[#0a0a0f] font-sans font-semibold text-sm shadow-xl shadow-amber-400/30 hover:bg-amber-300 active:scale-95 transition-all min-h-[44px]"
          >
            ✦ Analyze {selectedVerses.length} verse{selectedVerses.length > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <AnalysisSidebar
        isOpen={sidebarOpen}
        isLoading={loadingAnalysis}
        analysis={analysis}
        selectedVerses={selectedVerses}
        isCached={isCached}
        translation={translation}
        onClose={() => {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          setSelectedVerses([]);
          setSidebarOpen(false);
          lastAnalyzedKey.current = "";
        }}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
