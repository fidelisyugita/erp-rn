import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Box, Text } from 'native-base'

const StartupScreen = () => {
  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    // await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('LoginScreen')
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
