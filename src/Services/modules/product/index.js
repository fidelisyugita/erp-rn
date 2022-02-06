import { api } from '../../api'
import { getProducts } from './productApi'

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: getProducts(build),
  }),
  overrideExisting: true,
})

export const { useGetProductsQuery } = productApi
