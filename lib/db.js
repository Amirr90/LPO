import fs from "node:fs/promises";
import path from "node:path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dataDirectory = path.join(process.cwd(), "data");
const databaseFile = path.join(dataDirectory, "site-settings.db");

let dbPromise;

async function initializeDatabase(database) {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      await fs.mkdir(dataDirectory, { recursive: true });
      const database = await open({
        filename: databaseFile,
        driver: sqlite3.Database
      });
      await initializeDatabase(database);
      return database;
    })();
  }

  return dbPromise;
}
