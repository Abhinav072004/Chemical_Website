import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.SQLITE_PATH || join(__dirname, 'data.db');
export const db = new Database(dbPath);

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      education TEXT NOT NULL,
      research TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      office TEXT,
      home_page TEXT,
      publications TEXT,
      experience TEXT,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      location TEXT,
      type TEXT,
      description TEXT,
      registrations INTEGER,
      max_capacity INTEGER,
      participants INTEGER,
      status TEXT,
      color TEXT,
      image TEXT,
      event_type TEXT NOT NULL CHECK (event_type IN ('upcoming', 'past')),
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      home_page_url TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      address_location TEXT,
      role TEXT DEFAULT 'UG',
      sort_order INTEGER DEFAULT 1,
      image TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- NEW TABLE FOR NEWS TICKER --
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}