import * as SQLite from 'expo-sqlite';
import { QuoteItem } from '../types';

const DATABASE_NAME = 'quotes.db';
let dbInstance: SQLite.SQLiteDatabase | null = null;

const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return dbInstance;
};

export const initDatabase = async () => {
  const db = await getDb();
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY NOT NULL,
      body TEXT NOT NULL,
      author TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cached_quotes (
      id TEXT PRIMARY KEY NOT NULL,
      body TEXT NOT NULL,
      author TEXT NOT NULL,
      isFavorite INTEGER DEFAULT 0
    );
  `);
  
  return db;
};

export const saveFavorite = async (quote: QuoteItem) => {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO favorites (id, body, author) VALUES (?, ?, ?)',
    [quote.id, quote.body, quote.author]
  );
};

export const removeFavorite = async (id: string) => {
  const db = await getDb();
  await db.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
};

export const getFavorites = async (): Promise<QuoteItem[]> => {
  const db = await getDb();
  const allRows = await db.getAllAsync<{ id: string; body: string; author: string }>(
    'SELECT * FROM favorites'
  );
  
  return allRows.map(row => ({
    id: row.id,
    body: row.body,
    author: row.author,
    isFavorite: true,
    isUserAdded: false
  }));
};

export const cacheApiQuotes = async (quotes: QuoteItem[]) => {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM cached_quotes');
    for (const quote of quotes) {
      if (quote.id && quote.body && quote.author) {
        await db.runAsync(
          'INSERT OR REPLACE INTO cached_quotes (id, body, author, isFavorite) VALUES (?, ?, ?, ?)',
          [quote.id, quote.body, quote.author, quote.isFavorite ? 1 : 0]
        );
      }
    }
  });
};

export const getCachedApiQuotes = async (): Promise<QuoteItem[]> => {
  const db = await getDb();
  const allRows = await db.getAllAsync<{ id: string; body: string; author: string; isFavorite: number }>(
    'SELECT * FROM cached_quotes'
  );
  
  return allRows.map(row => ({
    id: row.id,
    body: row.body,
    author: row.author,
    isFavorite: row.isFavorite === 1,
    isUserAdded: false
  }));
};
