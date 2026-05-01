-- Migration: Agregar columna 'rol' a tabla users
-- Ejecutar: psql -U postgres -d lambert -f src/migrations/001_add_rol_to_users.sql

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS rol character varying(20) DEFAULT 'vendedor' NOT NULL;

-- Verificar
-- SELECT dni, nombre, email, rol FROM users LIMIT 5;
