import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Box } from 'native-base'

const StartupContainer = () => {
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

  return <Box flex={1} backgroundColor="primary.900" />
}

export default StartupContainer
