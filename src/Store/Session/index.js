import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  loginPayload: null,
  userRole: null,
  accessToken: null,
  refreshToken: null,
  customToken: null,
}

const slice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    reset: state => ({
      ...initialState,
    }),
    setUserId: (state, { payload }) => {
      state.userId = payload
    },
    setLoginPayload: (state, { payload }) => {
      state.loginPayload = payload
    },
    setUserRole: (state, { payload }) => {
      state.userRole = payload
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload
    },
    setCustomToken: (state, { payload }) => {
      state.customToken = payload
    },
  },
})

export const {
  reset,
  setUserId,
  setLoginPayload,
  setUserRole,
  setAccessToken,
  setRefreshToken,
  setCustomToken,
} = slice.actions

export default slice.reducer
