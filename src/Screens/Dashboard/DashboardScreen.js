import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  VStack,
  Divider,
  CheckIcon,
  Select,
  FlatList,
  HStack,
} from 'native-base'
import moment from 'moment'
import R from 'ramda'
import FilterDasbhoard from './Components/FilterDashboard'
import { useTranslation } from 'react-i18next'
import { useGetDasbhoardQuery } from '@/Services/modules/dashboard'
import { formatMoney, formatNumber } from '@/Helper/NumberHelper'
import i18n from '@/Translations'

const SORT = [
  {
    id: 'name-asc',
    type: 'asc',
    label: i18n.t('nameAZ'),
  },
  {
    id: 'name-desc',
    type: 'desc',
    label: i18n.t('nameZA'),
  },
  {
    id: 'profit-asc',
    type: 'asc',
    label: i18n.t('keuntunganAsc'),
  },
  {
    id: 'profit-desc',
    type: 'desc',
    label: i18n.t('keuntunganDesc'),
  },
]

const DashboardScreen = () => {
  const { t } = useTranslation()
  const [filterDate, setFilterDate] = useState({
    firstDate: moment().startOf('month').format('YYYY-MM-DD'),
    secondDate: moment().format('YYYY-MM-DD'),
  })

  const [products, setProducts] = useState([])

  const [sort, setSort] = useState(null)

  const { data } = useGetDasbhoardQuery({
    params: {
      startDate: filterDate.firstDate,
      endDate: filterDate.secondDate,
    },
  })

  useEffect(() => {
    if (Array.isArray(data?.products)) {
      setProducts(data.products)
    }
  }, [data])

  // useEffect(() => {
  //   switch (sort) {
  //     case 'name-asc':
  //       break
  //     case 'name-desc':
  //       break
  //     case 'profit-asc':
  //       setProducts(p => R.sortBy(R.prop('')))
  //       break
  //     case 'profit-desc':
  //       break

  //     default:
  //       break
  //   }
  // }, [sort])

  const keyExtractor = item => String(item.sku)

  const renderItem = ({ item }) => {
    return (
      <VStack
        space={3}
        mb="4"
        bgColor="white"
        borderWidth="1"
        borderColor="gray.200"
        p="2"
      >
        <HStack>
          <Text flex="1">
            {item.brand.name} {item.name}
          </Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('terjual')}</Text>
          <Text flex="1">
            {formatNumber(item.amount)} {item.measureUnit.name}
          </Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('reject')}</Text>
          <Text flex="1">
            {formatNumber(item.rejected)} {item.measureUnit.name}
          </Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('keuntungan')}</Text>
          <Text flex="1">
            {formatMoney((item.sellingPrice - item.buyingPrice) * item.amount)}
          </Text>
        </HStack>
      </VStack>
    )
  }

  return (
    <Box flex="1" backgroundColor="white">
      <FilterDasbhoard filterDate={filterDate} setFilterDate={setFilterDate} />
      <VStack
        space="2"
        mt="4"
        mx={'4'}
        borderWidth="1"
        borderColor="gray.200"
        p="2"
        borderRadius="md"
        mb="4"
      >
        <HStack>
          <Text flex="1">{t('keuntungan')}:</Text>
          <Text flex="1">{formatMoney(data?.cashIn - data?.cashOut)}</Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('penjualan')}:</Text>
          <Text flex="1">{formatMoney(data?.cashOut)}</Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('reject')}:</Text>
          <Text flex="1">{formatNumber(data?.rejectItem)}</Text>
        </HStack>
        <HStack>
          <Text flex="1">{t('sold')}:</Text>
          <Text flex="1">{formatNumber(data?.soldItem)}</Text>
        </HStack>
      </VStack>

      <Divider />

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={
        //   products.length > 0 ? (
        //     <Select
        //       w="1/2"
        //       selectedValue={sort}
        //       h="12"
        //       mb="2"
        //       placeholder={t('sortBy')}
        //       onValueChange={setSort}
        //       _selectedItem={{
        //         bg: 'primary.500',
        //         endIcon: <CheckIcon size="5" />,
        //       }}
        //     >
        //       <Select.Item label={t('sortBy')} value="" />
        //       {SORT.map(ts => (
        //         <Select.Item
        //           key={String(ts.id)}
        //           label={ts.label}
        //           value={ts.id}
        //         />
        //       ))}
        //     </Select>
        //   ) : null
        // }
        _contentContainerStyle={{
          py: '4',
          px: '4',
        }}
      />
    </Box>
  )
}

export default DashboardScreen
