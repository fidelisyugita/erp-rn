import { hideLoading, showLoading } from '@/Helper/LoadingHelper'

const showLoadingActions = [
  'login',
  'addProductCategory',
  'editProductCategory',
]

const hideLoadingActions = [
  'login',
  'addProductCategory',
  'editProductCategory',
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
