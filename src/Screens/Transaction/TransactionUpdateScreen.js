import React, { useState } from 'react'
import {
  Box,
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Skeleton,
  Text,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import { useGetTransactionStatusQuery } from '@/Services/modules/transaction'
import UpdateProductCard from './Components/UpdateProductCard'

const TransactionUpdateScreen = ({ route }) => {
  const transaction = route.params?.item

  const [status, setStatus] = useState(transaction?.status?.id)

  const [products, setProducts] = useState(transaction.products)

  const keyExtractor = item => String(item.barcode)

  const renderItem = ({ item }) => {
    return <UpdateProductCard item={item} />
  }

  return (
    <Box flex="1" bgColor="white">
      <FlatList
        ListHeaderComponent={
          <ListHeaderComponent
            invoiceCode={transaction.invoiceCode}
            status={status}
            setStatus={setStatus}
          />
        }
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Box>
  )
}

const ListHeaderComponent = ({ invoiceCode, status, setStatus }) => {
  const { t } = useTranslation()

  const {
    data: transactionStatus = [],
    isFetching: isFetchingTransactionStatus,
  } = useGetTransactionStatusQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  return (
    <Box p="4">
      <Text bold mb="2">
        {t('invoiceCode')}: {invoiceCode}
      </Text>
      <HStack alignItems="center">
        <Text mr="2">{t('status')} : </Text>
        <Skeleton h="12" w="100" isLoaded={!isFetchingTransactionStatus}>
          <Select
            selectedValue={status}
            onValueChange={setStatus}
            _selectedItem={{
              bg: 'primary.500',
              endIcon: <CheckIcon size="5" />,
            }}
            minW="100"
          >
            {transactionStatus.map(ts => (
              <Select.Item key={String(ts.id)} label={ts.name} value={ts.id} />
            ))}
          </Select>
        </Skeleton>
      </HStack>
      <Text mt="4">{t('products')}</Text>
    </Box>
  )
}

export default TransactionUpdateScreen
