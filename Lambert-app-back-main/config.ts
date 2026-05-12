// config.ts - Configuración centralizada con validación de variables de entorno

/**
 * Obtiene una variable de entorno string
 * @throws Error si la variable es requerida y no existe
 */
function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Variable de entorno requerida no definida: ${name}`);
  }
  return value || '';
}

/**
 * Obtiene una variable de entorno numérica
 * @throws Error si la variable es requerida y no existe o no es un número válido
 */
function getEnvVarNumber(name: string, defaultValue?: number): number {
  const value = process.env[name];
  if (!value && defaultValue !== undefined) return defaultValue;
  if (!value) throw new Error(`Variable de entorno requerida no definida: ${name}`);
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) throw new Error(`${name} debe ser un número válido`);
  return parsed;
}

// ============================================================================
// VARIABLES CRÍTICAS (sin defaults inseguros - DEBEN estar en .env)
// ============================================================================
export const SECRET_JWT_KEY = getEnvVar('SECRET_JWT_KEY');

// ============================================================================
// DATABASE - Soporta DATABASE_URL de Railway o variables individuales
// ============================================================================
const databaseUrl = process.env.DATABASE_URL || '';

let dbUser: string, dbPassword: string, dbHost: string, dbName: string, dbPort: number;

if (databaseUrl) {
  // Parsear DATABASE_URL (formato: postgresql://user:pass@host:port/dbname)
  const url = new URL(databaseUrl);
  dbUser = url.username;
  dbPassword = url.password;
  dbHost = url.hostname;
  dbName = url.pathname.slice(1); // quitar el '/' inicial
  dbPort = url.port ? parseInt(url.port, 10) : 5432;
} else {
  dbUser = getEnvVar('DB_USER', false) || 'postgres';
  dbPassword = getEnvVar('DB_PASSWORD');
  dbHost = getEnvVar('DB_HOST', false) || 'localhost';
  dbName = getEnvVar('DB_NAME', false) || 'lambert';
  dbPort = getEnvVarNumber('DB_PORT', 5432);
}

export const DB_USER = dbUser;
export const DB_PASSWORD = dbPassword;
export const DB_HOST = dbHost;
export const DB_NAME = dbName;
export const DB_PORT = dbPort;

// ============================================================================
// VARIABLES CON DEFAULTS SEGUROS
// ============================================================================
export const PORT = getEnvVarNumber('PORT', 3000);
export const SALT_ROUNDS = getEnvVarNumber('SALT_ROUNDS', 10);

// ============================================================================
// CORS - Soporta múltiples orígenes separados por coma
// ============================================================================
export const CORS_ORIGIN = getEnvVar('CORS_ORIGIN', false) || 'http://localhost:4200';
