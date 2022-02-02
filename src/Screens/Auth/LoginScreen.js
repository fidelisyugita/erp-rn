import React, { useState } from 'react'
import { Box, Button, Center, Input, Stack } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useToggle } from '@/Hooks'

const LoginScreen = () => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, togglePassword] = useToggle(false)

  const submit = () => {}

  return (
    <Box flex={1} backgroundColor="primary.900" justifyContent="center">
      <Center>
        <Stack space={6} w="75%" maxW="300px">
          <Input
            color="white"
            selectionColor="white"
            size="md"
            placeholder={t('username')}
            onChangeText={setUsername}
            value={username}
          />
          <Input
            color="white"
            selectionColor="white"
            size="md"
            placeholder={t('password')}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!isShowPassword}
            passwordRules="abceef"
            InputRightElement={
              <Button
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={togglePassword}
              >
                {isShowPassword ? t('hide') : t('show')}
              </Button>
            }
          />
          <Button isDisabled={!username || !password} onPress={submit}>
            {t('login')}
          </Button>
        </Stack>
      </Center>
    </Box>
  )
}

export default LoginScreen
