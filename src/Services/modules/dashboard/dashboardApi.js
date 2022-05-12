export const getDasbhoard = build => {
  return build.query({
    query: ({ params }) => ({
      url: `dashboard`,
      method: 'GET',
      params,
    }),
    providesTags: ['Dashboard'],
  })
}
