import Link from "next/link";

const exploreLinks = [
  { label: "Start Reading", href: "/read" },
  { label: "About PaRDeS", href: "/about#pardes" },
  { label: "Four Levels", href: "/about#four-levels" },
  { label: "About", href: "/about" },
];

const translationLinks = [
  { label: "KJV (King James Version)", href: "/read?translation=kjv" },
  { label: "WEB (World English Bible)", href: "/read?translation=web" },
  { label: "BBE (Bible in Basic English)", href: "/read?translation=bbe" },
  { label: "IRVTel (Telugu Indian Revised Version)", href: "/read?translation=irvtel" },
];

const linkClass =
  "font-sans text-sm text-[rgba(232,224,208,0.6)] hover:text-[#c9a84c] transition-colors duration-150";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "0.5px solid rgba(201,168,76,0.2)",
      }}
    >
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-10 pt-12 pb-8">

        {/* LEFT — Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#12121a",
                border: "1.5px solid #c9a84c",
              }}
            >
              <span className="font-serif text-2xl text-[#c9a84c] leading-none">ש</span>
            </div>
            <span className="font-serif text-[22px] text-[#c9a84c] tracking-wide">
              SelahPath
            </span>
          </div>

          <p className="font-serif text-sm italic text-[#c9a84c] leading-relaxed">
            Pause. Go deeper. Walk the path.
          </p>

          <p className="font-sans text-[13px] leading-relaxed text-[rgba(232,224,208,0.5)] max-w-xs">
            Revealing the original Hebrew and Greek depth of every verse through PaRDeS and the
            four levels of understanding.
          </p>
        </div>

        {/* MIDDLE — Explore */}
        <div className="flex flex-col gap-4">
          <p
            className="font-sans font-semibold text-[#c9a84c] uppercase tracking-[1.5px]"
            style={{ fontSize: 11 }}
          >
            Explore
          </p>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Translations */}
        <div className="flex flex-col gap-4">
          <p
            className="font-sans font-semibold text-[#c9a84c] uppercase tracking-[1.5px]"
            style={{ fontSize: 11 }}
          >
            Translations
          </p>
          <ul className="flex flex-col gap-3">
            {translationLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3 px-10 py-5"
        style={{ borderTop: "0.5px solid rgba(201,168,76,0.2)" }}
      >
        <p
          className="font-sans text-center md:text-left text-[12px]"
          style={{ color: "rgba(232,224,208,0.35)" }}
        >
          © 2026 SelahPath. Built for the glory of God.
        </p>

        <div className="flex items-center gap-2" style={{ color: "rgba(201,168,76,0.4)" }}>
          <span className="font-serif text-lg">ש</span>
          <span className="font-serif text-sm tracking-wide">סֶלָה</span>
        </div>
      </div>
    </footer>
  );
}
