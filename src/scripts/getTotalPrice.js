import { readProducts } from '../utils/readProducts.js';

export const getTotalPrice = async () => {
  const product = await readProducts();
  const totalPrice = product.reduce((acc, product) => {
    acc += Number(product.price);
    return acc;
  }, 0);
  return totalPrice;
};

console.log(await getTotalPrice());
