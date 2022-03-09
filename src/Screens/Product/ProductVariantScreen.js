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
import numbro from 'numbro'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import i18n from '@/Translations'

const transformNumbro = value => {
  return numbro(value || 0).format({
    thousandSeparated: true,
  })
}

const schema = yup
  .object({
    size: yup.string().label(i18n.t('size')).required(),
    stock: yup.number().label(i18n.t('stock')).required(),
    buyingPrice: yup.string().label(i18n.t('buyingPrice')).required(),
    sellingPrice: yup.string().label(i18n.t('sellingPrice')).required(),
    sold: yup.string().label(i18n.t('sold')).required(),
  })
  .required()

const ProductVariantScreen = ({ navigation, route }) => {
  const { type, item: paramItem, onSubmit: paramOnSubmit } = route?.params

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
      size: paramItem?.size,
      stock: transformNumbro(paramItem?.stock),
      buyingPrice: transformNumbro(paramItem?.buyingPrice),
      sellingPrice: transformNumbro(paramItem?.sellingPrice),
      sold: transformNumbro(paramItem?.sold),
    },
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
        tempScreen = { isDisabled: false, title: t('addProductVariant') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editProductVariant') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('productVariant') }
        break
      default:
        tempScreen = { isDisabled: true, title: t('undefined') }
        break
    }
    setScreenData(tempScreen)
  }, [type])

  const onSubmit = data => {
    let request = data

    if (type == 'edit') {
      request = {
        ...request,
        index: paramItem?.index,
      }
    }
    paramOnSubmit?.(request)
    setTimeout(() => {
      navigation.pop()
    }, 1000)
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
              <FormControl isRequired isInvalid={'size' in errors}>
                <FormControl.Label>{t('size')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputSize')}
                        onChangeText={onChange}
                        value={value}
                        isDisabled={screenData?.isDisabled}
                        maxLength={9}
                      />
                    )
                  }}
                  name="size"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.size?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'stock' in errors}>
                <FormControl.Label>{t('stock')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputStock')}
                        onChangeText={onChange}
                        value={transformNumbro(value)}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="stock"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.stock?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'buyingPrice' in errors}>
                <FormControl.Label>{t('buyingPrice')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputBuyingPrice')}
                        onChangeText={onChange}
                        value={transformNumbro(value)}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="buyingPrice"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.buyingPrice?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'sellingPrice' in errors}>
                <FormControl.Label>{t('sellingPrice')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputSellingPrice')}
                        onChangeText={onChange}
                        value={transformNumbro(value)}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="sellingPrice"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.sellingPrice?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'sold' in errors}>
                <FormControl.Label>{t('sold')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputSold')}
                        onChangeText={onChange}
                        value={transformNumbro(value)}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="sold"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.sold?.message}
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

export default ProductVariantScreen
