const parsePrice = (price) => {
  const parsedNumber = Number(price);
  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
};

const parseCategory = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  const isCategory = (value) =>
    ['books', 'electronics', 'clothing', 'other'].includes(value);

  if (isCategory(value)) return value;
};

export const parseFilterParams = (query) => {
  const { minPrice, maxPrice, category } = query;

  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);
  const parsedCategory = parseCategory(category);

  return {
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
    category: parsedCategory,
  };
};
