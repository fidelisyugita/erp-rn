import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Box,
  Button,
  FlatList,
  FormControl,
  HStack,
  IconButton,
  Input,
  Text,
  Toast,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import R from 'ramda'
import { scale, scaleHeight } from '@/Helper/ScaleHelper'
import { useTransactionOnlineMutation } from '@/Services/modules/transaction'

const TransactionOnlineDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation()
  const barcode = route.params?.barcode
  const [barcodes, setBarcodes] = useState([])
  const [tempBarcode, setTempBarcode] = useState('')
  const [invoiceCode, setInvoiceCode] = useState('')
  const [invoiceCodeError, setInvoiceCodeError] = useState(false)
  const [submitRequest] = useTransactionOnlineMutation({
    fixedCacheKey: 'add-online-transaction',
  })

  useLayoutEffect(() => {
    if (barcode) {
      if (barcodes.includes(barcode)) {
        setTimeout(() => {
          Toast.show({ description: t('barcodeAlreadyExist') })
        }, 1000)
      } else {
        setBarcodes(e => [...e, barcode])
      }
    }
  }, [barcode])

  const scan = () => {
    navigation.navigate('ScanBarcodeScreen', {
      previousScreen: 'TransactionOnlineDetailScreen',
    })
  }

  const onAddBarcode = () => {
    setBarcodes(e => {
      if (barcodes.includes(tempBarcode)) {
        setTimeout(() => {
          Toast.show({ description: t('barcodeAlreadyExist') })
        }, 1000)
        return e
      }
      return [...e, tempBarcode]
    })
    setTempBarcode('')
  }

  const onRemoveBarcode = item => {
    setBarcodes(R.without([item], barcodes))
  }

  const submit = () => {
    const request = {
      body: {
        invoiceCode,
        barcodes,
      },
    }
    submitRequest(request)
  }

  const keyExtractor = item => item

  const renderItem = ({ item }) => {
    return (
      <Box mx="4" mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center">
            <Barcode
              format="CODE128B"
              value={item}
              maxWidth={scale(40)}
              height={scaleHeight(20)}
            />
            <Text bold ml="4">
              {item}
            </Text>
          </HStack>
          <IconButton
            variant="solid"
            onPress={() => onRemoveBarcode(item)}
            _icon={{
              as: MaterialCommunityIcons,
              name: 'minus',
            }}
          />
        </HStack>
      </Box>
    )
  }

  return (
    <Box flex="1" bgColor="white" pt="4">
      <FormControl isRequired px="4" mb="4" isInvalid={invoiceCodeError}>
        <FormControl.Label>{t('invoiceCode')}</FormControl.Label>
        <Input
          placeholder={t('inputInvoice')}
          onChangeText={setInvoiceCode}
          value={invoiceCode}
        />
        <FormControl.ErrorMessage>
          {t('invoiceCodeRequiredField')}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl px="4" mb="6">
        <Input
          placeholder={t('inputBarcode')}
          onChangeText={setTempBarcode}
          value={tempBarcode}
          InputLeftElement={
            <IconButton
              variant="solid"
              onPress={scan}
              _icon={{
                as: MaterialCommunityIcons,
                name: 'barcode-scan',
              }}
            />
          }
          InputRightElement={
            <IconButton
              variant="solid"
              onPress={onAddBarcode}
              _icon={{
                as: MaterialCommunityIcons,
                name: 'plus',
              }}
            />
          }
        />
      </FormControl>

      <FlatList
        _contentContainerStyle={{
          pb: '20',
        }}
        data={barcodes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        shadow={2}
        bgColor="white"
        py="4"
      >
        <Button
          onPress={submit}
          isDisabled={barcodes.length < 1 || !invoiceCode}
          disabled={barcodes.length < 1 || !invoiceCode}
          colorScheme="primary"
          mx="4"
        >
          {t('submit')}
        </Button>
      </Box>
    </Box>
  )
}

export default TransactionOnlineDetailScreen
