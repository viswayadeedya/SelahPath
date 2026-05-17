import Link from "next/link";
import Footer from "@/components/Footer";

const dimensions = [
  {
    letter: "א",
    label: "Original Languages",
    color: "text-blue-300",
    borderColor: "border-blue-300/20",
    bg: "bg-blue-300/5",
    desc: "Uncover Hebrew and Greek roots with Strong's numbers, transliteration, and both literal and contextual meanings. What translation alone can never show you.",
  },
  {
    letter: "פ",
    label: "PaRDeS Levels",
    color: "text-purple-300",
    borderColor: "border-purple-300/20",
    bg: "bg-purple-300/5",
    desc: "The ancient rabbinic method: Peshat (literal), Remez (allegorical), Derash (homiletical), and Sod (hidden). Four dimensions of a single verse.",
  },
  {
    letter: "ד",
    label: "Four Levels",
    color: "text-green-300",
    borderColor: "border-green-300/20",
    bg: "bg-green-300/5",
    desc: "Tactics, Strategy, Principles, and Essence. A framework for translating scripture into convicting, practical, daily transformation.",
  },
  {
    letter: "ע",
    label: "Deep Reading",
    color: "text-amber-300",
    borderColor: "border-amber-300/20",
    bg: "bg-amber-300/5",
    desc: "A synthesized passage that surfaces what English-only readers miss: the cultural, historical, and theological depth beneath every word.",
  },
];

const features = [
  {
    icon: "✦",
    title: "Click Any Verse",
    desc: "Tap a verse to select it. Select multiple verses to analyze a unified passage.",
  },
  {
    icon: "⚡",
    title: "Instant Cache",
    desc: "Analysis is permanently stored. Every study is instant the second time. No waiting.",
  },
  {
    icon: "◎",
    title: "Four Translations",
    desc: "Switch between KJV, WEB, BBE, and IRVTel (Telugu). The analysis adapts to your translation.",
  },
  {
    icon: "☽",
    title: "Built to Contemplate",
    desc: "A dark, distraction-free environment designed for slow, intentional reading.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e0d0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-serif text-lg text-[#e8e0d0] tracking-wide hover:text-[#c9a84c] transition-colors">
          SelahPath™
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-xs font-sans uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
          >
            About
          </Link>
          <Link
            href="/read"
            className="text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
        </div>

        {/* Decorative Hebrew letters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <span className="absolute top-8 left-3 text-[clamp(1rem,12vw,5rem)] text-white/5 md:text-white/[8] font-serif leading-none">בְּרֵאשִׁית</span>
          <span className="absolute bottom-8 right-3 text-[clamp(1rem,10vw,4rem)] text-white/5 md:text-white/[8] font-serif leading-none">אֱלֹהִים</span>
          <span className="absolute top-8 right-3 text-[clamp(0.8rem,8vw,3rem)] text-white/5 md:text-white/[8] font-serif leading-none">שָׁלוֹם</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/70 mb-8">
            <span className="text-[#c9a84c]">✦</span>
            AI-Powered Bible Study
          </div>

          <h1 className="font-serif text-[#e8e0d0] mb-6 leading-none tracking-tight" style={{ fontSize: "clamp(2.25rem, 9vw, 6rem)" }}>
            SelahPath™
          </h1>

          <p className="text-xl md:text-2xl font-serif text-white/40 italic mb-4 leading-relaxed">
            &ldquo;to pause and reflect&rdquo;
          </p>

          <p className="text-base md:text-lg font-sans text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
            Read scripture slowly. Click any verse to unlock its full depth across original languages,
            ancient interpretation frameworks, and practical transformation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/read"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a84c] text-[#0a0a0f] font-sans font-semibold text-sm hover:bg-[#e0bc5e] transition-all shadow-lg shadow-[#c9a84c]/20"
            >
              Start Reading
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/60 font-sans text-sm hover:border-white/30 hover:text-white/80 transition-all"
            >
              Learn the Method
            </Link>
          </div>
        </div>
      </section>

      {/* Dimensions section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-3">
              Four Dimensions of Every Verse
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e8e0d0]">
              Scripture has never been one-dimensional
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {dimensions.map((dim) => (
              <div
                key={dim.label}
                className={`rounded-2xl border ${dim.borderColor} ${dim.bg} p-6 flex gap-4`}
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-black/30 border border-white/5">
                  <span className={`text-3xl font-serif ${dim.color} leading-none`}>
                    {dim.letter}
                  </span>
                </div>
                <div>
                  <h3 className={`font-sans font-semibold text-sm ${dim.color} mb-2`}>
                    {dim.label}
                  </h3>
                  <p className="text-sm text-white/55 font-sans leading-relaxed">
                    {dim.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#c9a84c]/60 mb-3">
              How It Works
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e8e0d0]">
              Designed for deep readers
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#1a1a2e] border border-white/10">
                  <span className="text-[#c9a84c] text-lg">{f.icon}</span>
                </div>
                <h3 className="font-sans font-semibold text-sm text-white/80 mb-2">{f.title}</h3>
                <p className="text-xs text-white/40 font-sans leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">
            <span className="text-[#c9a84c] text-2xl font-serif">✦</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#e8e0d0] mb-4">
            Begin your study
          </h2>
          <p className="text-white/40 font-sans text-sm mb-8 leading-relaxed">
            Open to John 3. Click verse 16. Let the Word open.
          </p>
          <Link
            href="/read"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a84c] text-[#0a0a0f] font-sans font-semibold text-sm hover:bg-[#e0bc5e] transition-all shadow-lg shadow-[#c9a84c]/20"
          >
            Open the Bible
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
