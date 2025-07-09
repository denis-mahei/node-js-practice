import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

export const readProducts = async () => {
  const data = await fs.readFile(PATH_DB);
  const products = JSON.parse(data);
  return await products;
};
