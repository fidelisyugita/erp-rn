/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (name, params) => {
  if (navigationRef?.isReady()) {
    navigationRef?.navigate(name, params)
  }
}

export const pop = count => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(CommonActions.goBack())
  }
}

export const navigateAndReset = (actions = [], index = 0) => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index,
        actions,
      }),
    )
  }
}

export const navigateAndSimpleReset = (name, index = 0) => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export const navigateAndReplace = (name, params) => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(StackActions.replace(name, params))
  }
}

export const getCurrentRoute = () => {
  if (navigationRef?.isReady()) {
    return navigationRef?.getCurrentRoute()
  }
  return null
}
