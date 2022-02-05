import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import { useToggle } from '@/Hooks'
import { useLoginMutation } from '@/Services/modules/auth'

const LoginScreen = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, togglePassword] = useToggle(false)

  const [login] = useLoginMutation()

  const submit = () => {
    const request = { body: { email, password } }

    login(request)
  }

  return (
    <Center flex={1} w="100%" background="white">
      <Box p="2" py="8" w="90%" maxW="290" background="white">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          {t('welcome')}
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          {t('signInToContinue')}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>{t('email')}</FormControl.Label>
            <Input
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{t('password')}</FormControl.Label>
            <Input
              onChangeText={setPassword}
              value={password}
              type={isShowPassword ? 'text' : 'password'}
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
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'primary.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              {t('forgotPassword')}
            </Link>
          </FormControl>
          <Button isDisabled={!email || !password} onPress={submit} mt="2">
            {t('signIn')}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              {`${t('dontHaveAccount')} ${t('pleaseContact')} `}
            </Text>
            <Link
              _text={{
                color: 'primary.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#"
            >
              {t('admin')}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default LoginScreen
