import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productSelected: [],
}

const slice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    selectProduct: (state, { payload, type }) => {
      const productIndex = state.productSelected.findIndex(
        ps => ps.id === payload.id,
      )

      if (productIndex > -1) {
        state.productSelected.splice(productIndex, 1)
      } else {
        state.productSelected.push(payload)
      }
    },
  },
})

export const { selectProduct } = slice.actions

export default slice.reducer
