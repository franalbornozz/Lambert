import { Request, Response } from 'express';
import { UsersRepository } from '../repositories/users.repository';

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsersRepository.findAll();
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
