import React from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  useTheme,
  VStack,
} from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import i18n from '@/Translations'
import {
  useAddContactMutation,
  useEditContactMutation,
} from '@/Services/modules/contact'

const schema = yup
  .object({
    name: yup.string().label(i18n.t('name')).min(3).required(),
    email: yup.string().email().label(i18n.t('email')).required(),
    alias: yup.string().label(i18n.t('alias')).min(3).required(),
    phone: yup.string().label(i18n.t('phone')).min(8).required(),
    address: yup.string().label(i18n.t('address')).min(3).required(),
    merchant: yup.string().label(i18n.t('merchant')).min(3).required(),
    description: yup.string().label(i18n.t('description')).nullable(true),
    note: yup.string().label(i18n.t('note')).nullable(true),
  })
  .required()

const ContactDetailScreen = ({ navigation, route }) => {
  const { type, item: paramItem } = route?.params

  const [screenData, setScreenData] = React.useState({})
  const { t } = useTranslation()
  const { sizes } = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: paramItem?.name,
      email: paramItem?.email,
      alias: paramItem?.alias,
      phone: paramItem?.phone,
      address: paramItem?.address,
      merchant: paramItem?.merchant,
      description: paramItem?.description,
      note: paramItem?.note,
    },
  })

  const [submitRequest] =
    type == 'add'
      ? useAddContactMutation({ fixedCacheKey: 'add-contact' })
      : useEditContactMutation({
          fixedCacheKey: 'edit-contact',
        })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: screenData?.title,
    })
  }, [navigation, screenData])

  React.useEffect(() => {
    let tempScreen = {}
    switch (type) {
      case 'add':
        tempScreen = { isDisabled: false, title: t('addContact') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editContact') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('contactDetail') }
        break
      default:
        tempScreen = { isDisabled: true, title: t('undefined') }
        break
    }
    setScreenData(tempScreen)
  }, [type])

  const onSubmit = data => {
    let request = {
      body: data,
    }

    if (type == 'edit') {
      request = {
        ...request,
        body: {
          ...request.body,
          id: paramItem?.id,
        },
      }
    }

    submitRequest(request)
  }

  return (
    <Box flex="1" bgColor="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: sizes[24] }}
        >
          <Center>
            <VStack width="90%" space={4} mt="4">
              <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label>{t('name')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputName')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="name"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.name?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label>{t('email')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputEmail')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                      keyboardType="email-address"
                    />
                  )}
                  name="email"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.email?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'alias' in errors}>
                <FormControl.Label>{t('alias')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputAlias')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="alias"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.alias?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'phone' in errors}>
                <FormControl.Label>{t('phone')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputPhone')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="phone"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.phone?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'address' in errors}>
                <FormControl.Label>{t('address')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputAddress')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="address"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.address?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'merchant' in errors}>
                <FormControl.Label>{t('merchant')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputMerchant')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="merchant"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.merchant?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl>
                <FormControl.Label>{t('description')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputDescription')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="description"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.description}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl>
                <FormControl.Label>{t('note')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputNote')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="note"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.note}
                </FormControl.ErrorMessage>
              </FormControl>

              {!screenData?.isDisabled ? (
                <Button onPress={handleSubmit(onSubmit)} colorScheme="primary">
                  {t('submit')}
                </Button>
              ) : null}
            </VStack>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  )
}

export default ContactDetailScreen
