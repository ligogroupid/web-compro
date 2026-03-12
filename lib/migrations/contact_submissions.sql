-- Migration: create contact_submissions table
-- Run this manually in the Supabase SQL Editor.

CREATE TABLE contact_submissions (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT         NOT NULL,
  email       TEXT         NOT NULL,
  phone       TEXT         NOT NULL,
  company     TEXT         NOT NULL,
  message     TEXT         NOT NULL,
  captcha_score REAL,
  created_at  TIMESTAMPTZ  DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (form submissions from the public site).
-- No SELECT / UPDATE / DELETE is granted to anon.
CREATE POLICY "Allow anonymous insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
