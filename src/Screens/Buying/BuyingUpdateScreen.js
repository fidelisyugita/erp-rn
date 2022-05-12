import React, { useState } from 'react'
import {
  Box,
  Button,
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Skeleton,
  Text,
} from 'native-base'
import R from 'ramda'
import { useTranslation } from 'react-i18next'
import UpdateProductCard from './Components/UpdateProductCard'
import {
  useGetBuyingStatusQuery,
  useTrackBuyingMutation,
} from '@/Services/modules/buying'

const BuyingUpdateScreen = ({ route }) => {
  const buying = route.params?.item

  const [status, setStatus] = useState(buying?.status?.id)

  const [products, setProducts] = useState(
    buying.products.map(p => ({
      ...p,
      received: 0,
      rejected: 0,
    })),
  )

  const toggleReceived = (item, operand) => {
    setProducts(pr => {
      const index = R.findIndex(p => p.barcode == item.barcode, pr)
      const received =
        operand == 'plus'
          ? pr[index].received + 1
          : operand == 'minus'
          ? pr[index].received - 1
          : operand
      return R.update(index, { ...pr[index], received: received })(pr)
    })
  }

  const toggleRejected = (item, operand) => {
    setProducts(pr => {
      const index = R.findIndex(p => p.barcode == item.barcode, pr)
      const rejected =
        operand == 'plus'
          ? pr[index].rejected + 1
          : operand == 'minus'
          ? pr[index].rejected - 1
          : operand
      return R.update(index, { ...pr[index], rejected: rejected })(pr)
    })
  }

  const keyExtractor = item => String(item.barcode)

  const renderItem = ({ item }) => {
    return (
      <UpdateProductCard
        item={item}
        toggleReceived={toggleReceived}
        toggleRejected={toggleRejected}
      />
    )
  }

  return (
    <Box flex="1" bgColor="white">
      <FlatList
        ListHeaderComponent={
          <ListHeaderComponent
            invoiceCode={buying.invoiceCode}
            status={status}
            setStatus={setStatus}
          />
        }
        ListFooterComponent={
          <ListFooterComponent
            id={buying.id}
            products={products}
            status={status}
          />
        }
        _contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponentStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
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
    data: buyingStatus = [],
    isFetching: isFetchingBuyingStatus,
  } = useGetBuyingStatusQuery({
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
        <Skeleton h="12" w="100" isLoaded={!isFetchingBuyingStatus}>
          <Select
            selectedValue={status}
            onValueChange={setStatus}
            _selectedItem={{
              bg: 'primary.500',
              endIcon: <CheckIcon size="5" />,
            }}
            minW="100"
          >
            {buyingStatus.map(ts => (
              <Select.Item key={String(ts.id)} label={ts.name} value={ts.id} />
            ))}
          </Select>
        </Skeleton>
      </HStack>
      <Text mt="4">{t('products')}</Text>
    </Box>
  )
}

const ListFooterComponent = ({ id, products, status }) => {
  const { t } = useTranslation()
  const [submitRequest] = useTrackBuyingMutation({
    fixedCacheKey: 'track-buying',
  })

  const submit = () => {
    const request = {
      id,
      body: {
        status: { id: status },
        products,
      },
    }
    submitRequest(request)
  }
  return (
    <Button onPress={submit} colorScheme="primary" mx="4" my="4">
      {t('submit')}
    </Button>
  )
}

export default BuyingUpdateScreen
