export const getProductCategories = build => {
  return build.query({
    query: ({ params }) => ({
      url: `productCategory`,
      method: 'GET',
      params,
    }),
  })
}
