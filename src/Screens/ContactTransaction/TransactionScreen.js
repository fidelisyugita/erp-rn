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
import { useDispatch } from 'react-redux'

import { usePagination, useAccess } from '@/Hooks'
import { TransactionCard } from '@/Components/Organisms'
import {
  useLazyGetTransactionsQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useTrackTransactionMutation,
  useTransactionOnlineMutation,
} from '@/Services/modules/transaction'
import FilterTransaction from './Components/FilterTransaction'
import ActionSheetTransaction from './Components/ActionSheetTransaction'
import ActionSheetAddOption from './Components/ActionSheetAddOption'
import { useLazyGetContactTransactionsQuery } from '@/Services/modules/contact'

const TransactionScreen = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isCanAdd } = useAccess()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclose()
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclose()
  const [selectedItem, setSelectedItem] = useState({})
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterDate, setFilterDate] = useState({
    firstDate: moment().format('YYYY-MM-DD'),
    secondDate: moment().format('YYYY-MM-DD'),
  })

  const paramItem = route.params?.item

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
  ] = usePagination(useLazyGetContactTransactionsQuery, {
    id: paramItem.id,
  })

  useEffect(() => {
    onRefresh()
  }, [filterStatus, filterType, filterDate])

  const [
    deleteTrigger,
    { isSuccess: isSuccessDelete, reset: resetDelete },
  ] = useDeleteTransactionMutation({
    fixedCacheKey: 'delete-transaction',
  })

  const [
    addTrigger,
    { isSuccess: isSuccessAdd, reset: resetAdd },
  ] = useAddTransactionMutation({
    fixedCacheKey: 'add-transaction',
  })

  const [
    editTrigger,
    { isSuccess: isSuccessEdit, reset: resetEdit },
  ] = useEditTransactionMutation({
    fixedCacheKey: 'edit-transaction',
  })

  const [
    trackTrigger,
    { isSuccess: isSuccessTrack, reset: resetTrack },
  ] = useTrackTransactionMutation({ fixedCacheKey: 'track-transaction' })

  const [
    addOnlineTrigger,
    { isSuccess: isSuccessAddOnline, reset: resetAddOnline },
  ] = useTransactionOnlineMutation({ fixedCacheKey: 'add-online-transaction' })

  React.useEffect(() => {
    if (isSuccessAdd) {
      onRefresh()
      resetAdd()
    }
  }, [isSuccessAdd])

  React.useEffect(() => {
    if (isSuccessEdit) {
      onRefresh()
      resetEdit()
    }
  }, [isSuccessEdit])

  React.useEffect(() => {
    if (isSuccessDelete) {
      onRefresh()
      resetDelete()
    }
  }, [isSuccessDelete])

  React.useEffect(() => {
    if (isSuccessTrack) {
      onRefresh()
      resetTrack()
    }
  }, [isSuccessTrack])

  React.useEffect(() => {
    if (isSuccessAddOnline) {
      onRefresh()
      resetAddOnline()
    }
  }, [isSuccessAddOnline])

  const searchRef = useRef(null)

  const onPressItem = item => {
    searchRef?.current?.blur()
    setSelectedItem(item)
    onOpen()
  }

  const renderItem = ({ item }) => {
    return <TransactionCard item={item} onPress={onPressItem} />
  }

  return (
    <Box flex="1" bgColor="white">
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
      <ActionSheetTransaction
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
      />
    </Box>
  )
}

export default TransactionScreen
