import React from 'react'
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
import {
  useAddTransactionMutation,
  useEditTransactionMutation,
  useGetTransactionStatusQuery,
  useGetTransactionTypesQuery,
} from '@/Services/modules/transaction'
import { useGetContactsQuery } from '@/Services/modules/contact'
import { useSelector } from 'react-redux'

const schema = yup
  .object({
    type: yup.string().required(),
    invoiceCode: yup.string().label(i18n.t('invoiceCode')).min(3).required(),
    description: yup.string().label(i18n.t('description')).nullable(true),
    products: yup.array().label(i18n.t('products')).required(),
    status: yup.string().label(i18n.t('transactionStatus')).required(),
    type: yup.string().label(i18n.t('transactionType')).required(),
    contact: yup.string().label(i18n.t('contact')).required(),
    tax: yup.number().label(i18n.t('tax')).required(),
    discount: yup.number().label(i18n.t('discount')).required(),
    note: yup.string().label(i18n.t('note')).required(),
  })
  .required()

const TransactionDetailScreen = ({ navigation, route }) => {
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
      invoiceCode: paramItem?.invoiceCode,
      description: paramItem?.description,
      products: paramItem?.products,
      status: paramItem?.status,
      type: paramItem?.type,
      contact: paramItem?.contact?.id,
      tax: paramItem?.tax,
      discount: paramItem?.discount,
      note: paramItem?.note,
    },
  })

  const [submitRequest] =
    type == 'add'
      ? useAddTransactionMutation({ fixedCacheKey: 'add-transaction' })
      : useEditTransactionMutation({
          fixedCacheKey: 'edit-transaction',
        })

  const {
    data: transactionStatus = [],
    isFetching: isFetchingTransactionStatus,
  } = useGetTransactionStatusQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const {
    data: transactionTypes = [],
    isFetching: isFetchingTransactionTypes,
  } = useGetTransactionTypesQuery({
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
        tempScreen = { isDisabled: false, title: t('addTransaction') }
        break
      case 'edit':
        tempScreen = { isDisabled: false, title: t('editTransaction') }
        break
      case 'view':
        tempScreen = { isDisabled: true, title: t('transactionDetail') }
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
        status: transactionStatus.find(ts => data.status == ts.id),
        type: transactionTypes.find(ts => data.type == ts.id),
        // products: products.map(pr => data.products.includes(pr.id)),
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
                        {productSelected.length > 0 ? (
                          productSelected.map((val, valIndex) => {
                            return (
                              <Text key={String(valIndex)}>{val.name}</Text>
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
                <FormControl.Label>{t('transactionStatus')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingTransactionStatus}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseTransactionStatus')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {transactionStatus.map(ts => (
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

              <FormControl isRequired isInvalid={'type' in errors}>
                <FormControl.Label>{t('transactionType')}</FormControl.Label>
                <Skeleton h="8" isLoaded={!isFetchingTransactionTypes}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={screenData?.isDisabled}
                        placeholder={t('chooseTransactionType')}
                        selectedValue={value}
                        onValueChange={onChange}
                        selectedItemBg={'teal.400'}
                      >
                        {transactionTypes.map(ts => (
                          <Select.Item
                            key={String(ts.id)}
                            label={ts.name}
                            value={ts.id}
                          />
                        ))}
                      </Select>
                    )}
                    name="type"
                    defaultValue=""
                  />
                </Skeleton>
                <FormControl.ErrorMessage>
                  {errors?.type?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'contact' in errors}>
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

export default TransactionDetailScreen
