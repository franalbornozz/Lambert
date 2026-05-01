import { Request, Response } from 'express';
import { ClientesRepository } from '../repositories/clientes.repository';

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await ClientesRepository.findAll();
    res.status(200).json(clientes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { cuit, razon_social } = req.body;

    if (!cuit || !razon_social) {
      return res.status(400).json({ error: 'CUIT y razón social son requeridos.' });
    }

    const cliente = await ClientesRepository.create(Number(cuit), razon_social);
    res.status(201).json(cliente);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
