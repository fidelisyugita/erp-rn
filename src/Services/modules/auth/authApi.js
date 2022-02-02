export const login = build => {
  return build.mutation({
    query: ({ body }) => ({
      url: `login`,
      body,
    }),
  })
}
