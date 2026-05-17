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
  translation: string;
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
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors min-h-[44px]"
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
        <span className="text-white/30 text-xs">{open ? "▲" : "▼"}</span>
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
    color: "text-blue-300",
  },
  {
    key: "remez",
    label: "Remez",
    letter: "ר",
    sub: "Allegorical",
    color: "text-purple-300",
  },
  {
    key: "derash",
    label: "Derash",
    letter: "ד",
    sub: "Homiletical",
    color: "text-green-300",
  },
  {
    key: "sod",
    label: "Sod",
    letter: "ס",
    sub: "Hidden",
    color: "text-amber-300",
  },
];

export default function AnalysisSidebar({
  isOpen,
  isLoading,
  analysis,
  selectedVerses,
  isCached,
  translation,
  onClose,
  onRegenerate,
}: AnalysisSidebarProps) {
  const [copied, setCopied] = useState(false);
  const tel = translation === "irvtel";

  const ui = {
    header:          tel ? "లోతైన అధ్యయనం"              : "Deep Study",
    noVerses:        tel ? "అధ్యయనం ప్రారంభించడానికి వచనాలు ఎంచుకోండి" : "Select verses to begin your study",
    words:           (n: number) => tel ? `${n} పదాలు`   : `${n} words`,
    origLang:        tel ? "మూల భాషలు"                  : "Original Languages",
    literal:         tel ? "అక్షరార్థం"                  : "Literal",
    context:         tel ? "సందర్భం"                    : "Context",
    root:            tel ? "మూలం"                       : "Root",
    letters:         tel ? "అక్షరాలు"                   : "Letters",
    properNouns:     tel ? "సరిపేర్లు"                  : "Proper Nouns",
    hebrew:          tel ? "హెబ్రీ"                     : "Hebrew",
    significance:    tel ? "ప్రాముఖ్యత"                 : "Significance",
    pardes:          tel ? "పర్డెస్ స్థాయిలు"            : "PaRDeS Levels",
    pardesSubs:      tel
      ? { peshat: "అక్షరార్థం", remez: "రూపకం", derash: "నీతి బోధన", sod: "దాగిన అర్థం" }
      : { peshat: "Literal",    remez: "Allegorical", derash: "Homiletical", sod: "Hidden" },
    fourLevels:      tel ? "నాలుగు స్థాయిలు"             : "Four Levels",
    tactics:         tel ? "వ్యూహాలు — ఏమి చేయాలి"       : "Tactics — What to Do",
    strategy:        tel ? "వ్యూహరచన — క్రమం & సమయం"    : "Strategy — Sequence & Timing",
    principles:      tel ? "సూత్రాలు — సార్వత్రిక నియమాలు" : "Principles — Universal Laws",
    law:             tel ? "నియమం"                      : "Law",
    aligned:         tel ? "✓ అనుసరించినప్పుడు"          : "✓ Aligned",
    violated:        tel ? "✗ ఉల్లంఘించినప్పుడు"         : "✗ Violated",
    essence:         tel ? "సారాంశం — దేవుని స్వభావం"    : "Essence — God's Character",
    character:       tel ? "స్వభావం"                    : "Character",
    reflection:      tel ? "ఆత్మపరిశీలన ప్రశ్న"          : "Reflection Question",
    embodiment:      tel ? "ఆచరణ"                      : "Embodiment",
    deepReading:     tel ? "లోతైన పఠనం"                 : "Deep Reading",
  };

  const handleCopy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(formatAnalysisAsText(analysis));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verseLabel =
    selectedVerses.length === 1
      ? selectedVerses[0].reference
      : `${selectedVerses[0]?.reference} – ${selectedVerses[selectedVerses.length - 1]?.reference}`;

  return (
    <>
      {/* ── Scrim — mobile only ── */}
      <div
        className={`
          fixed inset-0 bg-black/70 z-40 md:hidden
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* ── Sidebar ──
          Mobile  : fixed bottom sheet, slides up from bottom
          md+     : sticky side panel in the flex row            */}
      <aside
        className={[
          // shared
          "bg-[#12121a] flex flex-col overflow-hidden",
          // mobile: fixed bottom sheet
          "fixed inset-x-0 bottom-0 z-50 max-h-[90vh] rounded-t-[20px] border-t border-white/10",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
          // md+: static side panel, override fixed
          "md:static md:inset-auto md:translate-y-0",
          "md:rounded-none md:border-t-0 md:border-l",
          "md:h-screen md:max-h-none",
          "md:w-[45%] lg:w-[35%]",
          !isOpen ? "md:hidden" : "md:flex md:flex-col",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/25" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xs uppercase tracking-widest text-amber-400/70 font-sans mb-0.5">
              {ui.header}
            </h2>
            <p className="text-sm font-serif text-[#e8e0d0] truncate">
              {selectedVerses.length > 0 ? verseLabel : ui.noVerses}
            </p>
            {isCached && !isLoading && (
              <span className="text-[10px] text-green-400/60 font-mono">⚡ cached</span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-3 flex-shrink-0">
            {analysis && !isLoading && (
              <>
                <button
                  onClick={handleCopy}
                  title="Copy analysis"
                  className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors text-xs min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {copied ? "✓" : "⎘"}
                </button>
                <button
                  onClick={onRegenerate}
                  title="Regenerate"
                  className="p-2 rounded-md hover:bg-amber-400/10 text-amber-400/40 hover:text-amber-400 transition-colors text-base min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  ↻
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {isLoading ? (
            <AnalysisSkeleton />
          ) : analysis ? (
            <>
              {/* Original Languages */}
              <CollapsibleSection
                title={ui.origLang}
                badge={ui.words(analysis.original_languages?.length || 0)}
              >
                <div className="space-y-3">
                  {analysis.original_languages?.map((word, i) => (
                    <div key={i} className="rounded-lg bg-black/30 border border-white/5 p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xl md:text-2xl font-serif text-[#e8e0d0] leading-none break-all">
                          {word.word}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-mono font-semibold ml-2 flex-shrink-0 whitespace-nowrap">
                          {word.strongs}
                        </span>
                      </div>
                      <p className="text-xs italic text-white/50 mb-2 font-serif">
                        {word.transliteration}
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex gap-2 text-xs">
                          <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-14 flex-shrink-0 pt-0.5">
                            {ui.literal}
                          </span>
                          <span className="text-white/70 leading-relaxed">{word.literal}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-14 flex-shrink-0 pt-0.5">
                            {ui.context}
                          </span>
                          <span className="text-white/70 leading-relaxed">{word.contextual}</span>
                        </div>
                        {word.root && (
                          <div className="flex gap-2 text-xs">
                            <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-14 flex-shrink-0 pt-0.5">
                              {ui.root}
                            </span>
                            <span className="text-white/70 leading-relaxed">{word.root}</span>
                          </div>
                        )}
                        {word.letter_breakdown && (
                          <div className="mt-2 rounded-md bg-amber-400/5 border border-amber-400/10 p-2">
                            <span className="text-[10px] text-amber-400/50 font-sans uppercase tracking-wide block mb-1">
                              {ui.letters}
                            </span>
                            <p className="text-xs text-white/60 leading-relaxed font-serif italic">
                              {word.letter_breakdown}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Proper Nouns — only rendered when present */}
              {analysis.proper_nouns && analysis.proper_nouns.length > 0 && (
                <CollapsibleSection title={ui.properNouns} badge={`${analysis.proper_nouns.length}`}>
                  <div className="space-y-3">
                    {analysis.proper_nouns.map((noun, i) => (
                      <div key={i} className="rounded-lg bg-black/30 border border-white/5 p-3">
                        <p className="font-serif text-base text-[#e8e0d0] mb-1">{noun.name}</p>
                        <div className="space-y-1.5">
                          <div className="flex gap-2 text-xs">
                            <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-16 flex-shrink-0 pt-0.5">
                              {ui.hebrew}
                            </span>
                            <span className="text-white/70 leading-relaxed">{noun.hebrew_meaning}</span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="text-white/30 font-sans uppercase tracking-wide text-[10px] w-16 flex-shrink-0 pt-0.5">
                              {ui.significance}
                            </span>
                            <span className="text-white/70 leading-relaxed">{noun.cultural_significance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* PaRDeS */}
              <CollapsibleSection title={ui.pardes}>
                <div className="space-y-4">
                  {PARDES_META.map(({ key, label, letter, color }) => (
                    <div key={key} className="flex gap-3">
                      <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5">
                        <span className={`text-xl md:text-2xl font-serif ${color} leading-none`}>
                          {letter}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className={`text-xs font-semibold ${color}`}>{label}</span>
                          <span className="text-[10px] text-white/30 font-sans">{ui.pardesSubs[key as keyof typeof ui.pardesSubs]}</span>
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
              <CollapsibleSection title={ui.fourLevels}>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-amber-400/60 font-sans mb-2">
                      {ui.tactics}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-serif bg-black/20 rounded-lg p-3 border border-white/5">
                      {analysis.four_levels?.tactics}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-purple-400/60 font-sans mb-2">
                      {ui.strategy}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-serif bg-black/20 rounded-lg p-3 border border-white/5">
                      {analysis.four_levels?.strategy}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-blue-400/60 font-sans mb-2">
                      {ui.principles}
                    </h4>
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-2.5">
                      <p className="text-sm text-white/80 font-serif leading-relaxed">
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          {ui.law}
                        </span>
                        {analysis.four_levels?.principles?.law}
                      </p>
                      <div className="border-t border-white/5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-green-400/50 font-sans uppercase tracking-wide block mb-0.5">
                            {ui.aligned}
                          </span>
                          <p className="text-xs text-white/70 font-serif leading-relaxed">
                            {analysis.four_levels?.principles?.positive}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-red-400/50 font-sans uppercase tracking-wide block mb-0.5">
                            {ui.violated}
                          </span>
                          <p className="text-xs text-white/70 font-serif leading-relaxed">
                            {analysis.four_levels?.principles?.negative}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-amber-400/60 font-sans mb-2">
                      {ui.essence}
                    </h4>
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-3">
                      <div>
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          {ui.character}
                        </span>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          {analysis.four_levels?.essence?.character}
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[10px] text-amber-400/50 font-sans uppercase tracking-wide block mb-1">
                          {ui.reflection}
                        </span>
                        <p className="text-sm text-amber-100/80 font-serif italic leading-relaxed">
                          {analysis.four_levels?.essence?.reflection}
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[10px] text-white/30 font-sans uppercase tracking-wide block mb-0.5">
                          {ui.embodiment}
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
              <CollapsibleSection title={ui.deepReading}>
                <p className="text-sm text-white/85 font-serif leading-relaxed italic">
                  {analysis.deep_reading}
                </p>
              </CollapsibleSection>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-4xl mb-4 opacity-30">✦</p>
              <p className="text-white/30 text-sm font-serif">
                {ui.noVerses}
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
    if (w.root) lines.push(`  Root: ${w.root}`);
    if (w.letter_breakdown) lines.push(`  Letters: ${w.letter_breakdown}`);
  });
  if (analysis.proper_nouns && analysis.proper_nouns.length > 0) {
    lines.push("\n\n=== PROPER NOUNS ===");
    analysis.proper_nouns.forEach((n) => {
      lines.push(`\n${n.name}`);
      lines.push(`  Hebrew Meaning: ${n.hebrew_meaning}`);
      lines.push(`  Significance: ${n.cultural_significance}`);
    });
  }
  lines.push("\n\n=== PaRDeS LEVELS ===");
  lines.push(`\nPeshat:\n${analysis.pardes?.peshat}`);
  lines.push(`\nRemez:\n${analysis.pardes?.remez}`);
  lines.push(`\nDerash:\n${analysis.pardes?.derash}`);
  lines.push(`\nSod:\n${analysis.pardes?.sod}`);
  lines.push("\n\n=== FOUR LEVELS ===");
  lines.push(`\nTactics:\n${analysis.four_levels?.tactics}`);
  lines.push(`\nStrategy:\n${analysis.four_levels?.strategy}`);
  lines.push(`\nPrinciples - Law: ${analysis.four_levels?.principles?.law}`);
  lines.push(`  Positive: ${analysis.four_levels?.principles?.positive}`);
  lines.push(`  Negative: ${analysis.four_levels?.principles?.negative}`);
  lines.push(`\nEssence - Character: ${analysis.four_levels?.essence?.character}`);
  lines.push(`  Reflection: ${analysis.four_levels?.essence?.reflection}`);
  lines.push(`  Embodiment: ${analysis.four_levels?.essence?.embodiment}`);
  lines.push(`\n\n=== DEEP READING ===\n${analysis.deep_reading}`);
  return lines.join("\n");
}
