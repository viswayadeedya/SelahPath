-- Selah: Bible Study App
-- Run this in your Supabase SQL editor

-- verse_analysis: permanent cache for GPT-4o analysis results
create table if not exists verse_analysis (
  id uuid primary key default gen_random_uuid(),
  verse_reference text not null unique,  -- e.g. "John 3:16 - KJV"
  translation text not null,             -- e.g. "KJV"
  verse_text text not null,              -- the raw verse text
  analysis jsonb not null,               -- full GPT-4o JSON response
  created_at timestamptz not null default now()
);

-- Index for fast cache lookups
create index if not exists verse_analysis_reference_idx
  on verse_analysis (verse_reference);

-- Enable Row Level Security (allow public read, restrict writes to service role)
alter table verse_analysis enable row level security;

-- Policy: anyone can read cached analyses
create policy "Public can read analyses"
  on verse_analysis for select
  using (true);

-- Policy: only service role can insert/update (API route uses anon key with upsert)
-- For a public app where the API route does the writing, allow anon inserts too:
create policy "Anon can upsert analyses"
  on verse_analysis for insert
  with check (true);

create policy "Anon can update analyses"
  on verse_analysis for update
  using (true);
