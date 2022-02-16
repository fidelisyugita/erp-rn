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
  useAddBrandMutation,
  useEditBrandMutation,
} from '@/Services/modules/product'

const schema = yup
  .object({
    name: yup.string().label(i18n.t('name')).required(),
    description: yup.string().label(i18n.t('description')).nullable(true),
  })
  .required()

const BrandDetailScreen = ({ navigation, route }) => {
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
      description: paramItem?.description,
    },
  })

  const [submitRequest] =
    type == 'add'
      ? useAddBrandMutation({
          fixedCacheKey: 'add-brand',
        })
      : useEditBrandMutation({
          fixedCacheKey: 'edit-brand',
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
        tempScreen = { isDisabled: false, title: t('addBrand') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editBrand') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('brandDetail') }
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

export default BrandDetailScreen
