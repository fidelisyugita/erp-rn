import { hideLoading, showLoading } from '@/Helper/LoadingHelper'

const showLoadingActions = [
  'login',
  'forgotPassword',
  'addProductCategory',
  'editProductCategory',
  'deleteProductCategory',
  'addMeasureUnit',
  'editMeasureUnit',
  'deleteMeasureUnit',
  'addTransactionType',
  'editTransactionType',
  'deleteTransactionType',
  'addTransactionStatus',
  'editTransactionStatus',
  'deleteTransactionStatus',
  'addBuyingStatus',
  'editBuyingStatus',
  'deleteBuyingStatus',
  'addBuyingType',
  'editBuyingType',
  'deleteBuyingType',
  'addContact',
  'editContact',
  'deleteContact',
  'addProduct',
  'editProduct',
  'deleteProduct',
  'addBrand',
  'editBrand',
  'deleteBrand',
  'addAttendance',
  'approveAttendance',
  'addTransaction',
  'trackTransaction',
  'transactionOnline',
  'addBuying',
  'trackBuying',
]

const hideLoadingActions = [
  'login',
  'forgotPassword',
  'addProductCategory',
  'editProductCategory',
  'deleteProductCategory',
  'addMeasureUnit',
  'editMeasureUnit',
  'deleteMeasureUnit',
  'addTransactionType',
  'editTransactionType',
  'deleteTransactionType',
  'addTransactionStatus',
  'editTransactionStatus',
  'deleteTransactionStatus',
  'addBuyingStatus',
  'editBuyingStatus',
  'deleteBuyingStatus',
  'addBuyingType',
  'editBuyingType',
  'deleteBuyingType',
  'addContact',
  'editContact',
  'deleteContact',
  'addProduct',
  'editProduct',
  'deleteProduct',
  'addBrand',
  'editBrand',
  'deleteBrand',
  'addAttendance',
  'approveAttendance',
  'addTransaction',
  'trackTransaction',
  'transactionOnline',
  'addBuying',
  'trackBuying',
]

const actionsTracker = () => next => action => {
  if (action && action.meta?.arg) {
    const { meta } = action

    if (
      showLoadingActions.includes(meta.arg.endpointName) &&
      meta.requestStatus === 'pending'
    ) {
      showLoading()
    }

    if (
      hideLoadingActions.includes(meta.arg.endpointName) &&
      (meta.requestStatus === 'rejected' || meta.requestStatus === 'fulfilled')
    ) {
      hideLoading()
    }
  }

  return next(action)
}

export default actionsTracker
