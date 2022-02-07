export const getProducts = build => {
  return build.query({
    query: ({ params }) => ({
      url: `product`,
      method: 'GET',
      params,
    }),
  })
}
