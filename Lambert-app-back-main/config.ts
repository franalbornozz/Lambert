declare const process: {
  env: { [key: string]: string | undefined };
};

export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'cambiar-esta-clave-en-produccion',
} = process.env
