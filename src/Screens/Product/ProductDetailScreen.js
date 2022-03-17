import React from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
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
import i18n from '@/Translations'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import R from 'ramda'
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductCategoriesQuery,
  useGetBrandsQuery,
} from '@/Services/modules/product'
import { useGetMeasureUnitsQuery } from '@/Services/modules/measureUnit'
import { UploadImage, VariantCard } from '@/Components/Organisms'

const schema = yup
  .object({
    type: yup.string().required(),
    // sku: yup.string().label(i18n.t('sku')).min(3).required(),
    name: yup.string().label(i18n.t('name')).required(),
    // stock: yup.number().label(i18n.t('stock')).required(),
    category: yup.string().label(i18n.t('category')).required(),
    brand: yup.string().label(i18n.t('brand')).required(),
    // buyingPrice: yup.string().label(i18n.t('buyingPrice')).required(),
    // sellingPrice: yup.string().label(i18n.t('sellingPrice')).required(),
    // totalSold: yup.string().label(i18n.t('totalSold')).required(),
    measureUnit: yup.string().label(i18n.t('measureUnit')).required(),
    imageBase64: yup
      .string()
      .label(i18n.t('image'))
      .when(['type'], {
        is: type => type == 'add',
        then: yup.string().label(i18n.t('image')).required(),
        otherwise: yup.string().notRequired(),
      }),
    note: yup.string().label(i18n.t('note')).nullable(true),
    color: yup.string().label(i18n.t('color')).required(),
    variants: yup.array().of(
      yup
        .object()
        .shape({
          size: yup.number().label(i18n.t('size')).required(),
          stock: yup.number().label(i18n.t('stock')).required(),
          buyingPrice: yup.string().label(i18n.t('buyingPrice')).required(),
          sellingPrice: yup.string().label(i18n.t('sellingPrice')).required(),
          sold: yup.string().label(i18n.t('sold')).required(),
        })
        .label(i18n.t('variant'))
        .required(),
    ),
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
      // sku: paramItem?.sku,
      // barcode: paramItem?.barcode,
      name: paramItem?.name,
      category: paramItem?.category?.id,
      brand: paramItem?.brand?.id,
      measureUnit: paramItem?.measureUnit?.id,
      imageBase64: '',
      note: paramItem?.note,
      color: paramItem?.color,
      variants: paramItem?.variants || [],
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

  const { data: brands = [], isFetching: isFetchingBrands } = useGetBrandsQuery(
    {
      params: {
        page: 0,
        limit: 100,
      },
    },
  )

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
    delete data.barcode

    let request = {
      body: {
        ...data,
        category: productCategories.find(pc => data.category == pc.id),
        brand: brands.find(br => data.brand == br.id),
        measureUnit: measureUnits.find(mu => data.measureUnit == mu.id),
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
                          <UploadImage
                            onChangeValue={onChange}
                            buttonProps={{ ml: '4' }}
                          >
                            {t('upload')}
                          </UploadImage>
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

              {/* <FormControl isRequired isInvalid={'sku' in errors}>
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
              </FormControl> */}

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

              <FormControl isRequired isInvalid={'color' in errors}>
                <FormControl.Label>{t('color')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputColor')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="color"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.color?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              {/* {type !== 'add' ? (
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
                        isDisabled={true}
                        // InputRightElement={
                        //   !screenData?.isDisabled ? (
                        //     <Button
                        //       size="xs"
                        //       rounded="none"
                        //       w="1/6"
                        //       h="full"
                        //       onPress={() => scanBarcode(onChange)}
                        //     >
                        //       {t('scan')}
                        //     </Button>
                        //   ) : null
                        // }
                      />
                    )}
                    name="barcode"
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage>
                    {errors?.barcode?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : null} */}

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

              <FormControl isRequired isInvalid={'brand' in errors}>
                <FormControl.Label>{t('brand')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingBrands}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseBrand')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {brands.map(br => (
                          <Select.Item
                            key={String(br.id)}
                            label={br.name}
                            value={br.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="brand"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.brand?.message}
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

              <FormControl isRequired isInvalid={'variants' in errors}>
                <FormControl.Label>{t('variants')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    const onSubmit = item => {
                      onChange([...value, item])
                    }

                    const onDelete = pointer => {
                      onChange(R.drop(pointer + 1, value))
                    }

                    return (
                      <>
                        {value.length > 0 ? (
                          value.map((val, valIndex) => {
                            return (
                              <VariantCard
                                key={String(valIndex)}
                                item={val}
                                pointer={valIndex}
                                onDelete={onDelete}
                              />
                            )
                          })
                        ) : (
                          <Text color="gray.500" textAlign="center">
                            {t('noVariant')}
                          </Text>
                        )}
                        {!screenData?.isDisabled ? (
                          <Button
                            mt="4"
                            onPress={() =>
                              navigation.navigate('ProductVariantScreen', {
                                type: 'add',
                                onSubmit: onSubmit,
                              })
                            }
                          >
                            {t('addVariant')}
                          </Button>
                        ) : null}
                      </>
                    )
                  }}
                  name="variants"
                  defaultValue={[]}
                />
                <FormControl.ErrorMessage>
                  {errors?.variants?.message}
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
