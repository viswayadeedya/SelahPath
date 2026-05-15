"use client";

import { Verse } from "@/types/bible";

interface VerseCardProps {
  verse: Verse;
  isSelected: boolean;
  onSelect: (verse: Verse) => void;
}

export default function VerseCard({ verse, isSelected, onSelect }: VerseCardProps) {
  return (
    <span
      onClick={() => onSelect(verse)}
      className={`
        group inline cursor-pointer rounded-sm transition-all duration-200
        ${
          isSelected
            ? "bg-amber-500/10 border-b-2 border-amber-400 text-parchment"
            : "hover:bg-amber-500/5 border-b-2 border-transparent hover:border-amber-400/30"
        }
      `}
    >
      <sup
        className={`
          mr-1 text-xs font-sans font-semibold select-none
          ${isSelected ? "text-amber-400" : "text-amber-600/60 group-hover:text-amber-500/80"}
        `}
      >
        {verse.verse}
      </sup>
      <span className="font-serif leading-relaxed">{verse.text.trim()}</span>
      {" "}
    </span>
  );
}
