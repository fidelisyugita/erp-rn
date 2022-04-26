import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
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
import { useDispatch, useSelector } from 'react-redux'

import { useGetContactsQuery } from '@/Services/modules/contact'
import { InputAmount } from '@/Components/Atoms'
import {
  ProductVariantCard,
  ProductVariantTransactionCard,
} from '@/Components/Organisms'
import { formatNumber } from '@/Helper/NumberHelper'
import {
  addAmountProductSelected,
  minusAmountProductSelected,
} from '@/Store/Product'
import {
  useAddBuyingMutation,
  useGetBuyingStatusQuery,
  useGetBuyingTypeQuery,
} from '@/Services/modules/buying'

const schema = yup
  .object({
    type: yup.string().required(),
    invoiceCode: yup.string().label(i18n.t('invoiceCode')).min(3).required(),
    description: yup.string().label(i18n.t('description')).nullable(true),
    products: yup.array().label(i18n.t('products')).required().min(1),
    status: yup.string().label(i18n.t('buyingStatus')).required(),
    buyingType: yup.string().label(i18n.t('buyingType')).required(),
    contact: yup.string().label(i18n.t('contact')),
    tax: yup.number().label(i18n.t('tax')).required(),
    discount: yup.number().label(i18n.t('discount')).required(),
    note: yup.string().label(i18n.t('note')),
  })
  .required()

const BuyingDetailScreen = ({ navigation, route }) => {
  const { type, item: paramItem } = route?.params

  const [screenData, setScreenData] = useState({})
  const { t } = useTranslation()
  const { sizes } = useTheme()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: type,
      invoiceCode: paramItem?.invoiceCode,
      description: paramItem?.description,
      products: paramItem?.products || [],
      status: paramItem?.status?.id,
      buyingType: paramItem?.type?.id,
      contact: paramItem?.contact?.id,
      tax: paramItem?.tax,
      discount: paramItem?.discount,
      note: paramItem?.note,
    },
  })

  const [submitRequest] = useAddBuyingMutation({ fixedCacheKey: 'add-buying' })

  const {
    data: buyingStatus = [],
    isFetching: isFetchingBuyingStatus,
  } = useGetBuyingStatusQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const {
    data: buyingTypes = [],
    isFetching: isFetchingBuyingTypes,
  } = useGetBuyingTypeQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const {
    data: contacts = [],
    isFetching: isFetchingContacts,
  } = useGetContactsQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const { productSelected } = useSelector(state => state.product)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: screenData?.title,
    })
  }, [navigation, screenData])

  React.useEffect(() => {
    let tempScreen = {}
    switch (type) {
      case 'add':
        tempScreen = { isDisabled: false, title: t('addBuying') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editBuying') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('buyingDetail') }
        break
      default:
        tempScreen = { isDisabled: true, title: t('undefined') }
        break
    }
    setScreenData(tempScreen)
  }, [type])

  useEffect(() => {
    if (productSelected.length > 0 && screenData.isDisabled == false) {
      setValue('products', productSelected)
    }
  }, [productSelected])

  useEffect(() => {
    if (buyingTypes.length > 0) {
      setValue(
        'buyingType',
        buyingTypes.find(item => item.name.toUpperCase() === 'OFFLINE')?.id,
      )
    }
  }, [buyingTypes])

  const onSubmit = data => {
    delete data.type

    let request = {
      body: {
        ...data,
        status: buyingStatus.find(ts => data.status == ts.id),
        type: buyingTypes.find(ts => data.buyingType == ts.id),
        contact: contacts.find(c => data.contact == c.id),
      },
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

  const onChangeBuyingType = value => {
    setValue('buyingType', value)
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
              <FormControl isRequired isInvalid={'invoiceCode' in errors}>
                <FormControl.Label>{t('invoiceCode')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder={t('inputInvoice')}
                      onChangeText={onChange}
                      value={value}
                      isDisabled={screenData?.isDisabled}
                    />
                  )}
                  name="invoiceCode"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.invoiceCode?.message}
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

              <FormControl isRequired isInvalid={'products' in errors}>
                <FormControl.Label>{t('products')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        {value.length > 0 ? (
                          value.map((val, valIndex) => {
                            return (
                              <ProductVariantCard
                                key={val.barcode}
                                item={val}
                                disabled
                              >
                                <InputAmount
                                  disabled={screenData?.isDisabled}
                                  value={val.amount}
                                  alignSelf="center"
                                  width="1/2"
                                  onPlus={() =>
                                    dispatch(addAmountProductSelected(valIndex))
                                  }
                                  onMinus={() =>
                                    dispatch(
                                      minusAmountProductSelected(valIndex),
                                    )
                                  }
                                  stock={val.stock}
                                />
                              </ProductVariantCard>
                            )
                          })
                        ) : (
                          <Text color="gray.500" textAlign="center">
                            {t('noProduct')}
                          </Text>
                        )}
                        {!screenData?.isDisabled ? (
                          <Button
                            mt="4"
                            onPress={() =>
                              navigation.navigate('ParentProductScreen', {
                                selectable: true,
                                typeOfTransaction: 'buying',
                              })
                            }
                          >
                            {t('addProduct')}
                          </Button>
                        ) : null}
                      </>
                    )
                  }}
                  name="products"
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors?.products?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'status' in errors}>
                <FormControl.Label>{t('buyingStatus')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingBuyingStatus}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseBuyingStatus')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {buyingStatus.map(ts => (
                          <Select.Item
                            key={String(ts.id)}
                            label={ts.name}
                            value={ts.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="status"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.status?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'buyingType' in errors}>
                <FormControl.Label>{t('buyingType')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingBuyingTypes}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseBuyingType')}
                        selectedValue={value}
                        onValueChange={onChangeBuyingType}
                        selectedItemBg={'teal.400'}
                      >
                        {buyingTypes.map(ts => (
                          <Select.Item
                            key={String(ts.id)}
                            label={ts.name}
                            value={ts.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="buyingType"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.buyingType?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={'contact' in errors}>
                <FormControl.Label>{t('contact')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingContacts}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseContact')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {contacts.map(cs => (
                          <Select.Item
                            key={String(cs.id)}
                            label={`${cs.name} (${cs.email})`}
                            value={cs.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="contact"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.contact?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'tax' in errors}>
                <FormControl.Label>{t('tax')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputTax')}
                        onChangeText={onChange}
                        value={numbro(value || 0).format({
                          thousandSeparated: false,
                        })}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="tax"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.tax?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'discount' in errors}>
                <FormControl.Label>{t('discount')}</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Input
                        onBlur={onBlur}
                        placeholder={t('inputDiscount')}
                        onChangeText={onChange}
                        value={numbro(value || 0).format({
                          thousandSeparated: false,
                        })}
                        isDisabled={screenData?.isDisabled}
                        keyboardType="number-pad"
                        maxLength={9}
                      />
                    )
                  }}
                  name="discount"
                  defaultValue="0"
                />
                <FormControl.ErrorMessage>
                  {errors?.discount?.message}
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

export default BuyingDetailScreen
