import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Selah",
  description: "Learn about PaRDeS interpretation and the Four Levels framework used in Selah.",
};

const pardesLevels = [
  {
    letter: "פ",
    name: "Peshat",
    hebrew: "plain meaning",
    color: "text-blue-300",
    border: "border-blue-300/20",
    bg: "bg-blue-300/5",
    desc: "The plain, literal, surface-level meaning of the text. What it actually says in its historical and grammatical context. This is the foundation — no interpretation is valid that contradicts the Peshat.",
    example:
      '"The LORD is my shepherd; I shall not want." — The Psalmist is describing God using the metaphor of a shepherd who provides for and protects his flock.',
  },
  {
    letter: "ר",
    name: "Remez",
    hebrew: "hint / allusion",
    color: "text-purple-300",
    border: "border-purple-300/20",
    bg: "bg-purple-300/5",
    desc: "The allegorical layer — where the text hints at deeper truths, types, and symbols. In Christian reading, this often reveals how the Old Testament points to Christ. The word Remez means 'hint' in Hebrew.",
    example:
      '"The LORD is my shepherd" — points to Jesus who calls himself the Good Shepherd (John 10), the fulfillment of the Davidic promise and the one who lays down his life for his sheep.',
  },
  {
    letter: "ד",
    name: "Derash",
    hebrew: "to seek / investigate",
    color: "text-green-300",
    border: "border-green-300/20",
    bg: "bg-green-300/5",
    desc: "The homiletical and moral layer — the practical lesson for life and conduct. This is where scripture preaches. Derash asks: How does this change how I live? It's the application that comes from deeply searching the text.",
    example:
      '"I shall not want" — the moral lesson is one of contentment and radical trust. We are called to stop striving out of anxiety and learn to receive from God\'s provision rather than demand from circumstances.',
  },
  {
    letter: "ס",
    name: "Sod",
    hebrew: "secret / mystery",
    color: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-300/5",
    desc: "The hidden, mystical layer — the deepest essence of what God is revealing about Himself. Sod is not speculation; it is the revelation of God's character that emerges when all other layers have been laid bare. It asks: What does this tell us about who God is?",
    example:
      '"The LORD is my shepherd" — God\'s very nature is relational pursuit. He does not wait to be found; he seeks, guides, and restores. The Sod reveals that scarcity is fundamentally incompatible with the nature of God.',
  },
];

const fourLevels = [
  {
    name: "Tactics",
    icon: "⚔",
    color: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-300/5",
    desc: "The immediate, actionable calls to obedience. Tactics are not generic encouragements — they are specific actions the text demands. The tone is convicting: framed as things you already know but are not yet doing. Selah presents them as invitations to close the gap between knowledge and action.",
  },
  {
    name: "Strategy",
    icon: "◎",
    color: "text-purple-300",
    border: "border-purple-300/20",
    bg: "bg-purple-300/5",
    desc: "The sequence, timing, and order God is establishing. Many failures in the Christian life come not from doing the wrong thing, but from doing the right thing at the wrong time. Strategy identifies the divine order and shows what happens when it's violated — always with a concrete bad example.",
  },
  {
    name: "Principles",
    icon: "⚖",
    color: "text-blue-300",
    border: "border-blue-300/20",
    bg: "bg-blue-300/5",
    desc: "The universal laws embedded in the text. Principles are non-negotiable — they work for everyone, regardless of faith. The text always reveals both the positive result of alignment and the negative result of violation. Principles have no favorites.",
  },
  {
    name: "Essence",
    icon: "✦",
    color: "text-green-300",
    border: "border-green-300/20",
    bg: "bg-green-300/5",
    desc: "The deepest layer — what this reveals about God's character, nature, and inclination toward humanity. Essence always includes a reflection question to help the reader locate themselves in the verse, and a practical way to embody what God is revealing about Himself.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e0d0]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="font-serif text-lg text-[#e8e0d0] tracking-wide hover:text-[#c9a84c] transition-colors">
          SelahPath™
        </Link>
        <Link
          href="/read"
          className="text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
        >
          Start Reading
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-4">
            The Method
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#e8e0d0] mb-6">
            Selah Illuminates Sacred Scripture
          </h1>
          <p className="text-white/50 font-sans leading-relaxed">
            Selah combines two ancient and proven frameworks for biblical interpretation: the
            rabbinic PaRDeS method and Myron&apos;s Four Levels. Together, they reveal what any single
            reading misses.
          </p>
        </div>

        {/* PaRDeS section */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-2">
              Part One
            </p>
            <h2 className="font-serif text-3xl text-[#e8e0d0] mb-4">
              PaRDeS — The Orchard of Meaning
            </h2>
            <p className="text-white/55 font-sans leading-relaxed">
              The word{" "}
              <span className="font-serif italic text-white/70">pardes</span> means &ldquo;orchard&rdquo; in
              Hebrew and is an acronym for the four levels of Jewish biblical interpretation. The
              method teaches that every verse has not one meaning but four — each building on the
              last, none canceling the other.
            </p>
          </div>

          <div className="space-y-4">
            {pardesLevels.map((level) => (
              <div
                key={level.name}
                className={`rounded-2xl border ${level.border} ${level.bg} p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-black/30 border border-white/5">
                    <span className={`text-4xl font-serif ${level.color} leading-none`}>
                      {level.letter}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-3">
                      <h3 className={`font-sans font-bold text-base ${level.color}`}>
                        {level.name}
                      </h3>
                      <span className="text-xs text-white/30 font-serif italic">
                        ({level.hebrew})
                      </span>
                    </div>
                    <p className="text-sm text-white/70 font-sans leading-relaxed mb-4">
                      {level.desc}
                    </p>
                    <div className="rounded-lg bg-black/30 border border-white/5 p-3">
                      <p className="text-[10px] text-white/30 font-sans uppercase tracking-widest mb-1">
                        Example — Psalm 23:1
                      </p>
                      <p className="text-sm text-white/60 font-serif italic leading-relaxed">
                        {level.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Four Levels section */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-2">
              Part Two
            </p>
            <h2 className="font-serif text-3xl text-[#e8e0d0] mb-4">
              Four Levels — From Text to Life
            </h2>
            <p className="text-white/55 font-sans leading-relaxed">
              Where PaRDeS explores the depth of meaning, the Four Levels framework bridges
              interpretation into transformation. Each level asks a different question of the text
              — moving from action to sequence to law to essence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {fourLevels.map((level) => (
              <div
                key={level.name}
                className={`rounded-2xl border ${level.border} ${level.bg} p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-lg ${level.color}`}>{level.icon}</span>
                  <h3 className={`font-sans font-bold text-sm ${level.color}`}>{level.name}</h3>
                </div>
                <p className="text-sm text-white/60 font-sans leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-2">
              Using Selah
            </p>
            <h2 className="font-serif text-3xl text-[#e8e0d0]">How to use this tool</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1a1a2e] p-6 space-y-6">
            {[
              {
                step: "1",
                title: "Select your passage",
                body: "Choose a book, chapter, and translation from the controls at the top. The Bible loads live — no account needed.",
              },
              {
                step: "2",
                title: "Click to select verses",
                body: "Click any verse to highlight it. Click multiple verses to analyze them as a unified passage. The study sidebar opens automatically after 800ms.",
              },
              {
                step: "3",
                title: "Read slowly",
                body: "Work through each section in order: original languages first, then PaRDeS, then Four Levels. The reflection question in Essence is meant to be sat with.",
              },
              {
                step: "4",
                title: "Use Regenerate when needed",
                body: "The first analysis is cached permanently. If you want a fresh perspective or a different angle, use the Regenerate button to call GPT-4o again.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                  <span className="text-[10px] font-sans font-bold text-[#c9a84c]">{s.step}</span>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-white/80 mb-1">{s.title}</h4>
                  <p className="text-sm text-white/50 font-sans leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/read"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a84c] text-[#0a0a0f] font-sans font-semibold text-sm hover:bg-[#e0bc5e] transition-all shadow-lg shadow-[#c9a84c]/20"
          >
            Open the Bible
            <span>→</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
