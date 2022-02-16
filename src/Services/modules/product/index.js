import { api } from '../../api'
import { addBrand, editBrand, getBrands, deleteBrand } from './brandApi'
import {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
  downloadPdfProduct,
} from './productApi'
import {
  addProductCategory,
  deleteProductCategory,
  editProductCategory,
  getProductCategories,
} from './productCategoryApi'

export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getBrands: getBrands(build),
    addBrand: addBrand(build),
    editBrand: editBrand(build),
    deleteBrand: deleteBrand(build),

    getProducts: getProducts(build),
    addProduct: addProduct(build),
    editProduct: editProduct(build),
    deleteProduct: deleteProduct(build),
    downloadPdfProduct: downloadPdfProduct(build),

    getProductCategories: getProductCategories(build),
    addProductCategory: addProductCategory(build),
    editProductCategory: editProductCategory(build),
    deleteProductCategory: deleteProductCategory(build),
  }),
  overrideExisting: true,
})

export const {
  useGetBrandsQuery,
  useLazyGetBrandsQuery,
  useAddBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,

  useLazyGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useDownloadPdfProductMutation,

  useGetProductCategoriesQuery,
  useLazyGetProductCategoriesQuery,
  useAddProductCategoryMutation,
  useEditProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productApi
