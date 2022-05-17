export const getContactTransactions = build => {
  return build.query({
    query: ({ params, id }) => ({
      url: `transaction/contact/${id}`,
      method: 'GET',
      params,
    }),
    providesTags: ['ContactTransactions'],
  })
}
