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

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    createHttpError(404, 'Product not found!');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product ${product.name}`,
    data: product,
  });
};
