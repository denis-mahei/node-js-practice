export const calculatePaginationData = (count, page, perPage) => {
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPage - page);
  const hasPrevPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: count,
    hasNextPage,
    hasPrevPage,
  };
};
