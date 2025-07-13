import createHttpError from 'http-errors';

import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
} from '../services/products.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const products = await getAllProducts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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
    throw createHttpError(404, 'Product not found!');
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

export const upsertProductController = async (req, res, next) => {
  const { productId } = req.params;
  const result = await updateProduct(productId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Product not found'));
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully ${result.isNew ? 'created' : 'updated'} contact ${result.product.name}`,
    data: result.product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { productId } = req.params;

  const result = await updateProduct(productId, req.body);

  if (!result) {
    next(createHttpError(404, 'Product not found!'));
  }

  res.json({
    status: 200,
    message: `Successfully patched a ${result.product.name}`,
    data: result.product,
  });
};
