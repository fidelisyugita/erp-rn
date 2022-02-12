import React from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Skeleton,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import numbro from 'numbro'
import i18n from '@/Translations'
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductCategoriesQuery,
} from '@/Services/modules/product'
import { useGetMeasureUnitsQuery } from '@/Services/modules/measureUnit'
import { UploadImage } from '@/Components/Organisms'

const schema = yup
  .object({
    type: yup.string().required(),
    sku: yup.string().label(i18n.t('sku')).min(3).required(),
    name: yup.string().label(i18n.t('name')).required(),
    barcode: yup.string().label(i18n.t('barcode')).min(3).required(),
    stock: yup.number().label(i18n.t('stock')).required(),
    category: yup.string().label(i18n.t('category')).required(),
    buyingPrice: yup.string().label(i18n.t('buyingPrice')).required(),
    sellingPrice: yup.string().label(i18n.t('sellingPrice')).required(),
    totalSold: yup.string().label(i18n.t('totalSold')).required(),
    measureUnit: yup.string().label(i18n.t('measureUnit')).required(),
    imageBase64: yup
      .string()
      .label(i18n.t('image'))
      .when(['type'], {
        is: type => type == 'add',
        then: yup.string().label(i18n.t('image')).required(),
        otherwise: yup.string().notRequired(),
      }),
    description: yup.string().label(i18n.t('description')).nullable(true),
  })
  .required()

const ProductDetailScreen = ({ navigation, route }) => {
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
      type: type,
      sku: paramItem?.sku,
      name: paramItem?.name,
      barcode: paramItem?.barcode,
      stock: numbro(paramItem?.stock || 0).format({
        thousandSeparated: true,
      }),
      category: paramItem?.category?.id,
      buyingPrice: numbro(paramItem?.buyingPrice || 0).format({
        thousandSeparated: true,
      }),
      sellingPrice: numbro(paramItem?.sellingPrice || 0).format({
        thousandSeparated: true,
      }),
      totalSold: numbro(paramItem?.totalSold || 0).format({
        thousandSeparated: true,
      }),
      measureUnit: paramItem?.measureUnit?.id,
      imageBase64: '',
      description: paramItem?.description,
    },
  })

  const [submitRequest] =
    type == 'add'
      ? useAddProductMutation({ fixedCacheKey: 'add-product' })
      : useEditProductMutation({
          fixedCacheKey: 'edit-product',
        })

  const {
    data: productCategories = [],
    isFetching: isFetchingProductCategories,
  } = useGetProductCategoriesQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const {
    data: measureUnits = [],
    isFetching: isFetchingMeasureUnits,
  } = useGetMeasureUnitsQuery({
    params: {
      page: 0,
      limit: 100,
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
        tempScreen = { isDisabled: false, title: t('addProduct') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editProduct') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('productDetail') }
        break
      default:
        tempScreen = { isDisabled: true, title: t('undefined') }
        break
    }
    setScreenData(tempScreen)
  }, [type])

  const onSubmit = data => {
    delete data.type

    let request = {
      body: {
        ...data,
        category: productCategories.find(pc => data.category == pc.id),
        measureUnit: measureUnits.find(mu => data.measureUnit == mu.id),
        sellingPrice: numbro.unformat(data.sellingPrice),
        buyingPrice: numbro.unformat(data.buyingPrice),
        totalSold: numbro.unformat(data.totalSold),
        stock: numbro.unformat(data.stock),
      },
    }

    if (data.imageBase64) {
      request = {
        ...request,
        body: {
          ...request.body,
          imageBase64: data.imageBase64,
        },
      }
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
          contentContainerStyle={{ flexGrow: 1, paddingBottom: sizes[32] }}
        >
          <Center>
            <VStack width="90%" space={4} mt="4">
              <FormControl isRequired isInvalid={'imageBase64' in errors}>
                <FormControl.Label>{t('image')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <HStack alignItems="flex-start">
                        {!value && !paramItem?.imageUrl ? (
                          <Box
                            w="150"
                            h="150"
                            bgColor="gray.500"
                            borderRadius="4"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color="white" fontSize="4xl">
                              {t('image')}
                            </Text>
                          </Box>
                        ) : (
                          <Image
                            size={150}
                            alt="fallback text"
                            borderRadius="4"
                            source={{
                              uri: value || paramItem?.imageUrl,
                            }}
                            fallbackElement={
                              <Box
                                w="150"
                                h="150"
                                bgColor="gray.500"
                                borderRadius="4"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Text color="white" fontSize="4xl">
                                  {t('image')}
                                </Text>
                              </Box>
                            }
                          />
                        )}
                        {!screenData?.isDisabled ? (
                          <UploadImage onChangeValue={onChange} />
                        ) : null}
                      </HStack>
                    )
                  }}
                  name="imageBase64"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.imageBase64?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'sku' in errors}>
                <FormControl.Label>{t('sku')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputSKU')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="sku"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.sku?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label>{t('name')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputProductName')}
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

              <FormControl isRequired isInvalid={'barcode' in errors}>
                <FormControl.Label>{t('barcode')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputBarcode')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="barcode"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.barcode?.message}
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
                        value={numbro(value || 0).format({
                          thousandSeparated: true,
                        })}
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

              <FormControl isRequired isInvalid={'category' in errors}>
                <FormControl.Label>{t('category')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingProductCategories}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseCategory')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {productCategories.map(pc => (
                          <Select.Item
                            key={String(pc.id)}
                            label={pc.name}
                            value={pc.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="category"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.category?.message}
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
                        value={numbro(value || 0).format({
                          thousandSeparated: true,
                        })}
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
                        value={numbro(value || 0).format({
                          thousandSeparated: true,
                        })}
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

              <FormControl isRequired isInvalid={'totalSold' in errors}>
                <FormControl.Label>{t('totalSold')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputTotalSold')}
                        onChangeText={onChange}
                        value={numbro(value || 0).format({
                          thousandSeparated: true,
                        })}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="totalSold"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.totalSold?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'measureUnit' in errors}>
                <FormControl.Label>{t('measureUnit')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingMeasureUnits}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseMeasureUnit')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {measureUnits.map(pc => (
                          <Select.Item
                            key={String(pc.id)}
                            label={pc.name}
                            value={pc.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="measureUnit"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.measureUnit?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
          </Center>
        </ScrollView>
        {!screenData?.isDisabled ? (
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            // safeArea
            shadow={2}
            bgColor="white"
            py="4"
          >
            <Button
              onPress={handleSubmit(onSubmit)}
              colorScheme="primary"
              mx="4"
            >
              {t('submit')}
            </Button>
          </Box>
        ) : null}
      </KeyboardAvoidingView>
    </Box>
  )
}

export default ProductDetailScreen
