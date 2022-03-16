import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productSelected: [],
}

const slice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    resetSelectProduct: state => {
      state.productSelected = initialState.productSelected
    },
    selectProduct: (state, { payload, type }) => {
      const index = state.productSelected.findIndex(
        ps => ps.barcode == payload.barcode,
      )

      if (index > -1) {
        state.productSelected[index] = {
          ...state.productSelected[index],
          amount: state.productSelected[index].amount + payload.amount,
        }
      } else {
        state.productSelected.push(payload)
      }
    },

    addAmountProductSelected: (state, { payload }) => {
      state.productSelected[payload] = {
        ...state.productSelected[payload],
        amount: state.productSelected[payload].amount + 1,
      }
    },

    minusAmountProductSelected: (state, { payload }) => {
      state.productSelected[payload] = {
        ...state.productSelected[payload],
        amount: state.productSelected[payload].amount - 1,
      }
    },
  },
})

export const {
  selectProduct,
  addAmountProductSelected,
  minusAmountProductSelected,
  resetSelectProduct
} = slice.actions

export default slice.reducer
