import { Dimensions } from 'react-native'

const DESIGN_WIDTH = 125
const DESIGN_HEIGHT = 222.33

const { width, height } = Dimensions.get('window')

const activeWidth = height > width ? width : height
const activeHeight = height > width ? height : width

export function scale(layoutWidth) {
  return (layoutWidth * activeWidth) / DESIGN_WIDTH
}

export function scaleHeight(layoutHeight) {
  return (layoutHeight * activeHeight) / DESIGN_HEIGHT
}
