import { api } from '../../api'
import {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
} from './productApi'
import {
  addProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategories,
} from './productCategoryApi'

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: getProducts(build),
    addProduct: addProduct(build),
    editProduct: editProduct(build),
    deleteProduct: deleteProduct(build),

    getProductCategories: getProductCategories(build),
    addProductCategory: addProductCategory(build),
    editProductCategory: editProductCategory(build),
    deleteProductCategory: deleteProductCategory(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,

  useGetProductCategoriesQuery,
  useLazyGetProductCategoriesQuery,
  useAddProductCategoryMutation,
  useEditProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productApi
