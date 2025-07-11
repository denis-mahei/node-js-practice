import createHttpError from 'http-errors';

import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
} from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
