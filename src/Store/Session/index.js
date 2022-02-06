import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  userRole: null,
  accessToken: null,
  loginPayload: null,
}

const slice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    reset: state => ({
      ...initialState,
    }),
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload
    },
    setUserId: (state, { payload }) => {
      state.userId = payload
    },
    setUserRole: (state, { payload }) => {
      state.userRole = payload
    },
    setLoginPayload: (state, { payload }) => {
      state.loginPayload = payload
    },
  },
})

export const {
  reset,
  setAccessToken,
  setUserId,
  setUserRole,
  setLoginPayload,
} = slice.actions

export default slice.reducer
