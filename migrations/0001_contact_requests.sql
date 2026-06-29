CREATE TABLE IF NOT EXISTS contact_requests (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  project_type TEXT,
  message TEXT NOT NULL,
  source_language TEXT NOT NULL DEFAULT 'de',
  consent_given INTEGER NOT NULL DEFAULT 0,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at
  ON contact_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_requests_status
  ON contact_requests (status);

CREATE TABLE IF NOT EXISTS request_attachments (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (request_id) REFERENCES contact_requests (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_request_attachments_request_id
  ON request_attachments (request_id);

CREATE TABLE IF NOT EXISTS interaction_events (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  event_type TEXT NOT NULL,
  request_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  FOREIGN KEY (request_id) REFERENCES contact_requests (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_interaction_events_created_at
  ON interaction_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_interaction_events_type
  ON interaction_events (event_type);
