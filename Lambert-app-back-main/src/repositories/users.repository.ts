import { pool } from '../../db';

export interface UserRow {
  id: number;
  dni: string;
  nombre: string;
  email: string;
  rol: string;
}

export class UsersRepository {
  static async findAll(): Promise<UserRow[]> {
    try {
      const query = `
        SELECT dni AS id, dni, nombre, email, rol
        FROM users
        ORDER BY nombre;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  }
}
