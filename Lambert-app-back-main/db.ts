import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lambert',
  password: process.env.DB_PASSWORD || '159753',
  port: Number(process.env.DB_PORT) || 5432,
});

// Ejemplo de uso:
// const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
