"use client";

import { useState } from "react";
import { VerseAnalysis, SelectedVerse } from "@/types/bible";
import AnalysisSkeleton from "./AnalysisSkeleton";

interface AnalysisSidebarProps {
  isOpen: boolean;
  isLoading: boolean;
  analysis: VerseAnalysis | null;
  selectedVerses: SelectedVerse[];
  isCached: boolean;
  onClose: () => void;
  onRegenerate: () => void;
}

function CollapsibleSection({
  title,
  badge,
  children,
  defaultOpen = true,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a2e] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans font-semibold uppercase tracking-widest text-amber-400">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400/70 font-mono">
              {badge}
            </span>
          )}
        </div>
        <span className="text-white/30 text-sm">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const PARDES_META = [
  {
    key: "peshat",
    label: "Peshat",
    letter: "פ",
    sub: "Literal",
    desc: "The plain, surface meaning",
    color: "text-blue-300",
  },
  {
    key: "remez",
    label: "Remez",
    letter: "ר",
    sub: "Allegorical",
    desc: "Symbolism & typology",
    color: "text-purple-300",
  },
  {
    key: "derash",
    label: "Derash",
    letter: "ד",
    sub: "Homiletical",
    desc: "Moral & life application",
    color: "text-green-300",
  },
  {
    key: "sod",
    label: "Sod",
    letter: "ס",
    sub: "Hidden",
    desc: "Deepest spiritual layer",
    color: "text-amber-300",
  },
];

export default function AnalysisSidebar({
  isOpen,
  isLoading,
  analysis,
  selectedVerses,
  isCached,
  onClose,
  onRegenerate,
}: AnalysisSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!analysis) return;
    const text = formatAnalysisAsText(analysis);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verseLabel =
    selectedVerses.length === 1
      ? selectedVerses[0].reference
      : `${selectedVerses[0]?.reference} – ${selectedVerses[selectedVerses.length - 1]?.reference}`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 right-0 lg:right-auto
          w-full lg:w-auto
          h-full lg:h-screen
          z-30 lg:z-auto
          transition-transform duration-300 ease-in-out
          bg-[#12121a] border-l border-white/10
          flex flex-col
          overflow-hidden
          ${isOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-x-full lg:hidden"}
          bottom-0 lg:top-0
          rounded-t-2xl lg:rounded-none
          max-h-[92vh] lg:max-h-screen
        `}
        style={{ width: "clamp(320px, 30vw, 480px)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xs uppercase tracking-widest text-amber-400/70 font-sans mb-0.5">
              Deep Study
            </h2>
            <p className="text-sm font-serif text-parchment truncate">
              {selectedVerses.length > 0 ? verseLabel : "No verses selected"}
            </p>
            {isCached && !isLoading && (
              <span className="text-[10px] text-green-400/60 font-mono">
                ⚡ cached
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            {analysis && !isLoading && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy analysis"
                  className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors text-xs"
                >
                  {copied ? "✓" : "⎘"}
                </button>
                <button
                  onClick={onRegenerate}
                  title="Regenerate analysis"
                  className="p-1.5 rounded-md hover:bg-amber-400/10 text-amber-400/40 hover:text-amber-400 transition-colors text-xs"
                >
                  ↻
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {isLoading ? (
            <AnalysisSkeleton />
          ) : analysis ? (
            <>
              {/* Original Languages */}
              <CollapsibleSection title="Original Languages" badge={`${analysis.original_languages?.length || 0} words`}>
                <div className="space-y-3">
                  {analysis.original_languages?.map((word, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-black/30 border border-white/5 p-3"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl font-serif text-parchment leading-none">
                          {word.word}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-mono font-semibold ml-2 flex-shrink-0">
                          {word.strongs}
                        </span>
                      </div>
                      <p className="text-xs italic text-white/50 mb-2 font-serif">
                        {word.transliteration}
                      </p>
                      <div className="space-y-1">
                        <div className="flex gap-2 text-xs">
                          <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-16 flex-shrink-0">
                            Literal
                          </span>
                          <span className="text-white/70">{word.literal}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-16 flex-shrink-0">
                            Context
                          </span>
                          <span className="text-white/70">{word.contextual}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* PaRDeS */}
              <CollapsibleSection title="PaRDeS Levels">
                <div className="space-y-4">
                  {PARDES_META.map(({ key, label, letter, sub, color }) => (
                    <div key={key} className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5">
                        <span className={`text-2xl font-serif ${color} leading-none`}>
                          {letter}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className={`text-xs font-semibold ${color}`}>{label}</span>
                          <span className="text-[10px] text-white/30 font-sans">{sub}</span>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed font-serif">
                          {analysis.pardes?.[key as keyof typeof analysis.pardes]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Four Levels */}
              <CollapsibleSection title="Four Levels">
                <div className="space-y-4">
                  {/* Tactics */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-amber-400/60 font-sans mb-2">
                      Tactics — What to Do
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-serif bg-black/20 rounded-lg p-3 border border-white/5">
                      {analysis.four_levels?.tactics}
                    </p>
                  </div>

                  {/* Strategy */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-purple-400/60 font-sans mb-2">
                      Strategy — Sequence & Timing
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-serif bg-black/20 rounded-lg p-3 border border-white/5">
                      {analysis.four_levels?.strategy}
                    </p>
                  </div>

                  {/* Principles */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-blue-400/60 font-sans mb-2">
                      Principles — Universal Laws
                    </h4>
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2.5">
                      <p className="text-sm text-white/80 font-serif leading-relaxed">
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          Law
                        </span>
                        {analysis.four_levels?.principles?.law}
                      </p>
                      <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-green-400/50 font-sans uppercase tracking-wide block mb-0.5">
                            ✓ Aligned
                          </span>
                          <p className="text-xs text-white/70 font-serif leading-relaxed">
                            {analysis.four_levels?.principles?.positive}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-red-400/50 font-sans uppercase tracking-wide block mb-0.5">
                            ✗ Violated
                          </span>
                          <p className="text-xs text-white/70 font-serif leading-relaxed">
                            {analysis.four_levels?.principles?.negative}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Essence */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-amber-400/60 font-sans mb-2">
                      Essence — God&apos;s Character
                    </h4>
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-3">
                      <div>
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          Character
                        </span>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          {analysis.four_levels?.essence?.character}
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[10px] text-amber-400/50 font-sans uppercase tracking-wide block mb-1">
                          Reflection Question
                        </span>
                        <p className="text-sm text-amber-100/80 font-serif italic leading-relaxed">
                          {analysis.four_levels?.essence?.reflection}
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          Embodiment
                        </span>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          {analysis.four_levels?.essence?.embodiment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Deep Reading */}
              <CollapsibleSection title="Deep Reading">
                <p className="text-sm text-white/85 font-serif leading-relaxed italic">
                  {analysis.deep_reading}
                </p>
              </CollapsibleSection>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-4xl mb-4 opacity-30">✦</p>
              <p className="text-white/30 text-sm font-serif">
                Select verses to begin your study
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function formatAnalysisAsText(analysis: VerseAnalysis): string {
  const lines: string[] = [];

  lines.push("=== ORIGINAL LANGUAGES ===");
  analysis.original_languages?.forEach((w) => {
    lines.push(`\n${w.word} (${w.transliteration}) [${w.strongs}]`);
    lines.push(`  Literal: ${w.literal}`);
    lines.push(`  Contextual: ${w.contextual}`);
  });

  lines.push("\n\n=== PaRDeS LEVELS ===");
  lines.push(`\nPeshat (Literal):\n${analysis.pardes?.peshat}`);
  lines.push(`\nRemez (Allegorical):\n${analysis.pardes?.remez}`);
  lines.push(`\nDerash (Homiletical):\n${analysis.pardes?.derash}`);
  lines.push(`\nSod (Hidden):\n${analysis.pardes?.sod}`);

  lines.push("\n\n=== FOUR LEVELS ===");
  lines.push(`\nTactics:\n${analysis.four_levels?.tactics}`);
  lines.push(`\nStrategy:\n${analysis.four_levels?.strategy}`);
  lines.push(`\nPrinciples:`);
  lines.push(`  Law: ${analysis.four_levels?.principles?.law}`);
  lines.push(`  Positive: ${analysis.four_levels?.principles?.positive}`);
  lines.push(`  Negative: ${analysis.four_levels?.principles?.negative}`);
  lines.push(`\nEssence:`);
  lines.push(`  Character: ${analysis.four_levels?.essence?.character}`);
  lines.push(`  Reflection: ${analysis.four_levels?.essence?.reflection}`);
  lines.push(`  Embodiment: ${analysis.four_levels?.essence?.embodiment}`);

  lines.push(`\n\n=== DEEP READING ===\n${analysis.deep_reading}`);

  return lines.join("\n");
}
