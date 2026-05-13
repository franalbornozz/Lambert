import { VercelRequest, VercelResponse } from '@vercel/node';
import pkg from 'pg';

const { Pool } = pkg;

function getPool() {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    const url = new URL(dbUrl);
    return new Pool({
      user: url.username,
      host: url.hostname,
      database: url.pathname.slice(1),
      password: url.password,
      port: url.port ? parseInt(url.port, 10) : 5432,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
  }
  return new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'lambert',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  try {
    const pool = getPool();
    const result = await pool.query('SELECT dni, email, password_hash, nombre, rol FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];
    const bcrypt = await import('bcrypt');
    const passwordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const jwt = await import('jsonwebtoken');
    const token = jwt.default.sign(
      { id: user.dni, dni: user.dni, email: user.email, rol: user.rol },
      process.env.SECRET_JWT_KEY || 'fallback-key',
      { expiresIn: '1h' }
    );

    res.setHeader('Set-Cookie', `access_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`);
    res.status(200).json({ email: user.email, rol: user.rol, id: user.dni });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    res.status(500).json({ error: message });
  }
}
