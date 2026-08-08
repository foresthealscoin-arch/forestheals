import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
const useSsl = Boolean(
  databaseUrl && !databaseUrl.includes('localhost') && !databaseUrl.includes('127.0.0.1'),
);

export const isDatabaseConfigured = Boolean(databaseUrl);

export const db = databaseUrl
  ? drizzle(postgres(databaseUrl, { ssl: useSsl ? 'require' : false, max: 1 }))
  : null;

export function getDb() {
  if (!db) {
    throw new Error(
      'DATABASE_URL is not configured. Set it in Vercel Environment Variables or local .env.local.',
    );
  }

  return db;
}
