import { readProducts } from '../utils/readProducts.js';

const getProductsByMinPrice = async (price) => {
  const data = await readProducts();
  return data.filter((item) => {
    if (Number(item.price) >= Number(price)) {
      return item;
    }
  });
};

console.log(await getProductsByMinPrice(800));
