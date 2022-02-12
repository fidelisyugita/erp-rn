import React from 'react'
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
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import i18n from '@/Translations'
import { useTranslation } from 'react-i18next'
import { useForgotPasswordMutation } from '@/Services/modules/auth'

const schema = yup
  .object({
    email: yup.string().email().label(i18n.t('email')).required(),
  })
  .required()

const ForgotPasswordScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const [forgotPasswordRequest] = useForgotPasswordMutation()

  const submit = data => {
    const request = {
      body: { email: data.email },
    }

    forgotPasswordRequest(request)
  }

  return (
    <Center flex={1} w="100%" background="white">
      <Box p="2" py="8" w="90%" maxW="290" background="white">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          {t('forgotPassword')}
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          {t('forgotPasswordDescripton')}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label>{t('email')}</FormControl.Label>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                  />
                )
              }}
            />
            <FormControl.ErrorMessage>
              {errors?.email?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={handleSubmit(submit)} mt="2">
            {t('submit')}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              {`${t('haveAnAccount')} `}
            </Text>
            <Link
              _text={{
                color: 'primary.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#"
              onPress={() => navigation.pop()}
            >
              {t('signIn')}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default ForgotPasswordScreen
