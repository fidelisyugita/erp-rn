import { api } from '../../api'
import { getProducts } from './productApi'
import { getProductCategories } from './productCategoryApi'

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: getProducts(build),
    getProductCategories: getProductCategories(build),
  }),
  overrideExisting: true,
})

export const {
  useGetProductsQuery,
  useLazyGetProductCategoriesQuery,
} = productApi
