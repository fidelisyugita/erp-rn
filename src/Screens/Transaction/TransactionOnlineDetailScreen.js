import React, { useState } from 'react'
import { Box, Button, FlatList, FormControl, Input, Text } from 'native-base'
import { useTranslation } from 'react-i18next'

const TransactionOnlineDetailScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const [barcodes, setBarcodes] = useState([])
  const [invoiceCode, setInvoiceCode] = useState('')

  const scan = () =>
    navigation.navigate('ScanBarcodeScreen', { callback: scanCallback })

  const scanCallback = value => setBarcodes(e => [...e, value])

  const keyExtractor = item => item

  const renderItem = ({ item }) => {
    return <Text>{item}</Text>
  }

  return (
    <Box flex="1" bgColor="white">
      <FlatList
        data={barcodes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={
          <FormControl isRequired>
            <FormControl.Label>{t('invoiceCode')}</FormControl.Label>

            <Input
              placeholder={t('inputInvoice')}
              onChangeText={setInvoiceCode}
              value={invoiceCode}
            />

            <FormControl.ErrorMessage>{'abcd'}</FormControl.ErrorMessage>
          </FormControl>
        }
        ListFooterComponent={
          <Button onPress={scan} colorScheme="primary" mx="4">
            {t('scan')}
          </Button>
        }
      />
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
        <Button onPress={null} colorScheme="primary" mx="4">
          {t('submit')}
        </Button>
      </Box>
    </Box>
  )
}

export default TransactionOnlineDetailScreen
