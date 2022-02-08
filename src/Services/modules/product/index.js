import { api } from '../../api'
import { getProducts } from './productApi'
import {
  addProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategories,
} from './productCategoryApi'

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: getProducts(build),
    getProductCategories: getProductCategories(build),
    addProductCategory: addProductCategory(build),
    editProductCategory: editProductCategory(build),
    deleteProductCategory: deleteProductCategory(build),
  }),
  overrideExisting: true,
})

export const {
  useGetProductsQuery,
  useLazyGetProductCategoriesQuery,
  useAddProductCategoryMutation,
  useEditProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productApi
