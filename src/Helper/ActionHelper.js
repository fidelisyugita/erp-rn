import { hideLoading, showLoading } from '@/Helper/LoadingHelper'

const showLoadingActions = [
  'login',
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
]

const hideLoadingActions = [
  'login',
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
