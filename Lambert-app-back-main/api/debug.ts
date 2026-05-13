import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    nodeEnv: process.env.NODE_ENV,
    hasSecret: !!process.env.SECRET_JWT_KEY,
    hasDbUrl: !!process.env.DATABASE_URL,
    dbHost: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'not set',
    vercel: !!process.env.VERCEL,
  });
}
