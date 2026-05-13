import { VercelRequest, VercelResponse } from '@vercel/node';
import pkg from 'pg';

const { Pool } = pkg;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ status: 'error', message: 'DATABASE_URL not set' });
    }
    const url = new URL(dbUrl);
    const pool = new Pool({
      user: url.username,
      host: url.hostname,
      database: url.pathname.slice(1),
      password: url.password,
      port: url.port ? parseInt(url.port, 10) : 5432,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
    const result = await pool.query('SELECT COUNT(*) FROM users');
    res.status(200).json({ status: 'ok', users: result.rows[0].count, db: 'connected' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ status: 'error', message });
  }
}
