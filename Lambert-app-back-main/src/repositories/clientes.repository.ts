import { pool } from '../../db';

export interface ClienteRow {
  cuit: number;
  razon_social: string;
}

export class ClientesRepository {
  static async findAll(): Promise<ClienteRow[]> {
    try {
      const query = `
        SELECT cuit, razon_social
        FROM cliente
        ORDER BY razon_social;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error al buscar clientes:", error);
      throw new Error("No se pudo obtener la lista de clientes.");
    }
  }

  static async create(cuit: number, razon_social: string): Promise<ClienteRow> {
    try {
      const query = `
        INSERT INTO cliente (cuit, razon_social)
        VALUES ($1, $2)
        ON CONFLICT (cuit) DO UPDATE SET razon_social = EXCLUDED.razon_social
        RETURNING cuit, razon_social;
      `;
      const result = await pool.query(query, [cuit, razon_social]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw new Error("No se pudo crear el cliente.");
    }
  }
}
