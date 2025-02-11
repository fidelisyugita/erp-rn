import { useSelector } from 'react-redux'

export default function () {
  const {
    accessToken,
    userId,
    loginPayload,
    refreshToken,
    userRole,
  } = useSelector(state => state.session)

  return {
    accessToken,
    userId,
    loginPayload,
    refreshToken,
    userRole,
  }
}
