import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Input,
  Icon,
  FlatList,
  Spinner,
  useTheme,
  IconButton,
  useDisclose,
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { usePagination, useAccess } from '@/Hooks'
import { TransactionCard as BuyingCard } from '@/Components/Organisms'
import {
  useAddBuyingMutation,
  useLazyGetBuyingQuery,
  useTrackBuyingMutation,
} from '@/Services/modules/buying'
import FilterBuying from './Components/FilterBuying'
import ActionSheetBuying from './Components/ActionSheetBuying'

const BuyingScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isCanAdd } = useAccess()
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedItem, setSelectedItem] = useState({})
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterDate, setFilterDate] = useState({
    firstDate: moment().format('YYYY-MM-DD'),
    secondDate: moment().format('YYYY-MM-DD'),
  })

  const [
    {
      list,
      onRefresh,
      onSearch,
      onLoadMore,
      keyExtractor,
      renderEmpty,
      renderFooter,
    },
    { isSearch, isRefresh, isFirstLoad },
  ] = usePagination(useLazyGetBuyingQuery, {
    params: {
      statusId: filterStatus,
      typeId: filterType,
      startDate: filterDate.firstDate,
      endDate: filterDate.secondDate,
    },
  })

  useEffect(() => {
    onRefresh()
  }, [filterStatus, filterType, filterDate])

  const [
    addTrigger,
    { isSuccess: isSuccessAdd, reset: resetAdd },
  ] = useAddBuyingMutation({
    fixedCacheKey: 'add-buying',
  })

  const [
    trackTrigger,
    { isSuccess: isSuccessTrack, reset: resetTrack },
  ] = useTrackBuyingMutation({ fixedCacheKey: 'track-buying' })

  React.useLayoutEffect(() => {
    if (isCanAdd) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            onPress={() => {
              navigation.navigate('BuyingDetailScreen', { type: 'add' })
            }}
            key="ghost"
            variant="ghost"
            _icon={{
              as: MaterialIcons,
              name: 'add',
            }}
          />
        ),
      })
    }
  }, [navigation, isCanAdd])

  React.useEffect(() => {
    if (isSuccessAdd) {
      onRefresh()
      resetAdd()
    }
  }, [isSuccessAdd])

  React.useEffect(() => {
    if (isSuccessTrack) {
      onRefresh()
      resetTrack()
    }
  }, [isSuccessTrack])

  const searchRef = useRef(null)

  const onPressItem = item => {
    searchRef?.current?.blur()
    setSelectedItem(item)
    onOpen()
  }

  const renderItem = ({ item }) => {
    return <BuyingCard item={item} onPress={onPressItem} />
  }

  return (
    <Box flex="1" bgColor="white">
      <Box px="4">
        <Input
          ref={searchRef}
          placeholder={t('search')}
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          mt="4"
          fontSize="14"
          onChangeText={onSearch}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            isSearch ? <Spinner color="primary.500" m="2" mr="3" /> : null
          }
        />
      </Box>
      <FilterBuying
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
        setFilterType={setFilterType}
        filterType={filterType}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      {isFirstLoad || isSearch || isRefresh ? (
        <Box mt="4" py="4" alignItems="center">
          <Spinner color="primary.500" />
        </Box>
      ) : (
        <FlatList
          mx="4"
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          data={list}
          keyExtractor={keyExtractor}
          mt="4"
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: '4' }}
          ItemSeparatorComponent={() => <Box mb="2" />}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              color={colors.primary[500]}
              tintColor={colors.primary[500]}
            />
          }
        />
      )}
      <ActionSheetBuying
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
      />
    </Box>
  )
}

export default BuyingScreen
