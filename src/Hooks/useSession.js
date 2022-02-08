import { useSelector } from 'react-redux'

export default function () {
  const { accessToken, userId, loginPayload, refreshToken } = useSelector(
    state => state.session,
  )

  return {
    accessToken,
    userId,
    loginPayload,
    refreshToken,
  }
}
