import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Box, Text } from 'native-base'
import useSession from '@/Hooks/useSession'

const StartupScreen = () => {
  const { t } = useTranslation()
  const { userId } = useSession()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )

    let destination = 'LoginScreen'

    if (userId) {
      destination = 'Main'
    }

    navigateAndSimpleReset(destination)
  }

  useEffect(() => {
    init()
  })

  return (
    <Box
      flex={1}
      backgroundColor="primary.900"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="4xl" bold color="white">
        ERP APP
      </Text>
    </Box>
  )
}

export default StartupScreen
