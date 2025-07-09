import fs from 'node:fs/promises';

import { createFakeProduct } from '../utils/createFakeProducts.js';
import { PATH_DB } from '../constants/products.js';
import { readProducts } from '../utils/readProducts.js';
import { writeProducts } from '../utils/writeProducts.js';

const generateProducts = async (amount) => {
  try {
    const products = await readProducts();

    for (let i = 1; i <= amount; i += 1) {
      products.push(createFakeProduct());
    }

    await writeProducts(products);
  } catch (e) {
    console.log(e.message);
  }
};

generateProducts(5);
