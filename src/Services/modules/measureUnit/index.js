import { api } from '../../api'
import {
  getMeasureUnits,
  addMeasureUnit,
  editMeasureUnit,
  deleteMeasureUnit,
} from './measureUnitApi'

export const measureUnitApi = api.injectEndpoints({
  endpoints: build => ({
    getMeasureUnits: getMeasureUnits(build),
    addMeasureUnit: addMeasureUnit(build),
    editMeasureUnit: editMeasureUnit(build),
    deleteMeasureUnit: deleteMeasureUnit(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetMeasureUnitsQuery,
  useAddMeasureUnitMutation,
  useEditMeasureUnitMutation,
  useDeleteMeasureUnitMutation,
} = measureUnitApi
