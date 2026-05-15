# SelahPath™

> *"Pause. Go deeper. Walk the path."*

SelahPath is a premium AI-powered Bible study web application that reveals the full depth of any scripture passage — across original languages, ancient interpretation frameworks, and practical life transformation.

---

## What It Does

Select any verse (or multiple verses) while reading scripture, and SelahPath instantly delivers a deep multi-dimensional breakdown:

| Dimension | Description |
|---|---|
| **Original Languages** | Hebrew/Greek words with Strong's numbers, transliteration, literal and contextual meanings |
| **PaRDeS Levels** | Peshat (literal) → Remez (allegorical) → Derash (homiletical) → Sod (hidden/mystical) |
| **Four Levels** | Tactics, Strategy, Principles, and Essence — from text to daily transformation |
| **Deep Reading** | A synthesis of what English-only readers miss |

Analysis results are permanently cached in Supabase — GPT-4o is called **once per verse per translation**, making every repeat study instant.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Styling** — Tailwind CSS
- **Database / Cache** — Supabase (PostgreSQL)
- **AI** — OpenAI GPT-4o
- **Bible Text** — [bible-api.com](https://bible-api.com) (free, no key required)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/viswayadeedya/SelahPath.git
cd SelahPath
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-...
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your **Project URL** and **anon/public key** into `.env.local`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── about/page.tsx        # PaRDeS + Four Levels explainer
│   ├── read/page.tsx         # Main Bible reader
│   └── api/
│       ├── bible/route.ts    # Proxies bible-api.com
│       └── analyze/route.ts  # Cache check → GPT-4o → Supabase
├── components/
│   ├── BibleReader.tsx       # Reader + verse selection + debounce
│   ├── AnalysisSidebar.tsx   # Collapsible analysis panel
│   ├── AnalysisSkeleton.tsx  # Loading state
│   ├── VerseCard.tsx         # Individual verse with selection
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── supabase.ts           # Lazy Supabase client
│   └── bible-api.ts          # Bible API helpers
└── types/
    └── bible.ts              # All TypeScript types + BOOKS/TRANSLATIONS
```

---

## Features

- **Multi-verse selection** — click multiple verses to analyze them as a unified passage
- **800ms debounce** — waits for you to finish selecting before firing the API call
- **Permanent cache** — analyses stored in Supabase, instant on repeat visits
- **Regenerate** — bypass cache and get a fresh GPT-4o analysis anytime
- **Copy to clipboard** — export the full analysis as plain text
- **Three translations** — KJV, WEB, BBE with more easily added
- **All 66 books** — full Old and New Testament navigation
- **Mobile responsive** — sidebar becomes a bottom sheet on small screens
- **Dark, reverent UI** — designed for slow, intentional reading

---

## Design

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Surface | `#12121a` |
| Card | `#1a1a2e` |
| Text | `#e8e0d0` (warm parchment) |
| Accent | `#c9a84c` (gold) |
| Scripture font | Georgia serif |
| UI font | System sans-serif |

---

## Supabase Schema

The `supabase-schema.sql` file creates:

- `verse_analysis` table — caches full GPT-4o JSON responses
- Index on `verse_reference` for fast lookups
- Row Level Security policies allowing public read/write via the anon key

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `OPENAI_API_KEY` | Yes | OpenAI API key with GPT-4o access |

---

## License

Built for the glory of God. Use freely.

---

*SelahPath™ — סֶלָה*
