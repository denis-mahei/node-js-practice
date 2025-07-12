import { Product } from '../models/products.js';

export const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

export const getProductById = async (id) => await Product.findById(id);

export const createNewProduct = async (payload) => {
  const product = await Product.create(payload);
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findOneAndDelete({ _id: productId });
  return product;
};

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
