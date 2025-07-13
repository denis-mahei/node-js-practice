import { Product } from '../models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/sort.js';

export const getAllProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = Product.find();

  if (filter.minPrice || filter.maxPrice) {
    const priceFilter = {};
    if (filter.minPrice) priceFilter.$gte = filter.minPrice;
    if (filter.maxPrice) priceFilter.$lte = filter.maxPrice;
    productsQuery.where('price', priceFilter);
  }

  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }

  const [productsCount, products] = await Promise.all([
    Product.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
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
