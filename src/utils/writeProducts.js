import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

export const writeProducts = async (updatedProd) =>
  await fs.writeFile(PATH_DB, JSON.stringify(updatedProd, null, 2));
