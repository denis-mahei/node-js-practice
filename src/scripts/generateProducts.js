import fs from 'node:fs/promises';

import { createFakeProduct } from '../utils/createFakeProducts.js';
import { PATH_DB } from '../constants/products.js';

const generateProducts = async (amount) => {
  try {
    const data = await fs.readFile(PATH_DB);
  } catch (e) {}
};
