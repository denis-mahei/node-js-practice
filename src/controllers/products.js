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

export const getProductByIdController = async (req, res) => {
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

export const createProductController = async (req, res) => {
  const product = await createNewProduct(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a ${product.name}`,
    data: product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;

  const product = await deleteProduct(productId);

  if (!product) {
    next(createHttpError(404, 'Product not found!'));
  }

  res.status(204).send();
};

export const upsertProductController = () => {

};