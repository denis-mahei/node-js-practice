import { Product } from '../models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllProducts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = Product.find();
  const productsCount = await Product.find()
    .merge(productsQuery)
    .countDocuments();

  const products = await productsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
};

export const getProductById = (id) => Product.findById(id);

export const createNewProduct = (payload) => Product.create(payload);

export const deleteProduct = (productId) =>
  Product.findOneAndDelete({ _id: productId });

export const updateProduct = async (productId, payload, options = {}) => {
  const rawResult = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
