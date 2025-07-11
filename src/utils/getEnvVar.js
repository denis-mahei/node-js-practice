import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (key, fallback) => {
  const value = process.env[key];

  if (value) return value;

  if (fallback) return fallback;

  throw new Error(`Missing: process.env[${key}]`);
};
