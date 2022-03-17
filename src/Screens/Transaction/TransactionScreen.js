import React, { useRef } from 'react'
import {
  Box,
  Input,
  Icon,
  FlatList,
  Text,
  Spinner,
  Pressable,
  useTheme,
  IconButton,
  useDisclose,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'

import { usePagination, useAccess } from '@/Hooks'
import { ActionSheet } from '@/Components/Organisms'
import {
  useLazyGetTransactionsQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useDownloadPdfTransactionMutation,
} from '@/Services/modules/transaction'
import numbro from 'numbro'
import { generateDeliveryOrder } from '@/Helper/PdfHelper'
import { resetSelectProduct } from '@/Store/Product'
import { useDispatch } from 'react-redux'

const TransactionScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isCanAdd } = useAccess()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclose()
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
  ] = usePagination(useLazyGetTransactionsQuery)

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

  const [selectedItem, setSelectedItem] = React.useState({})

  React.useLayoutEffect(() => {
    if (isCanAdd) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            onPress={() => {
              navigation.navigate('TransactionDetailScreen', {
                type: 'add',
              })
              dispatch(resetSelectProduct())
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

  const searchRef = useRef(null)

  const onPressItem = item => {
    searchRef?.current?.blur()
    setSelectedItem(item)
    onOpen()
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => onPressItem(item)}>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth={1}
              borderColor="coolGray.200"
              py="2"
              bg={isPressed ? 'coolGray.200' : 'white'}
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  borderRadius="2"
                  size="48px"
                  source={{
                    uri: item?.products[0]?.imageUrl,
                  }}
                />
                <VStack>
                  <Text color="coolGray.800" bold>
                    {item.invoiceCode}
                  </Text>
                  <Text color="coolGray.600">
                    {item?.contact?.name ? item.contact.name : 'Marketplace'}
                  </Text>
                  {/* <Text color="coolGray.600">
                    {item.products.map((p, idx) => {
                      if (idx) return `, ${p.sku}`
                      return p.sku
                    })}
                  </Text> */}
                </VStack>
                <Spacer />
                <VStack>
                  <Text fontSize="xs" color="coolGray.800" textAlign="right">
                    {numbro(item.totalPrice || 0).format({
                      thousandSeparated: true,
                      prefix: 'Rp ',
                    })}
                  </Text>
                  <Text fontSize="xs" color="coolGray.800">
                    {item.status.name}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )
        }}
      </Pressable>
    )
  }

  return (
    <Box flex="1" bgColor="white" paddingX="4">
      <Input
        ref={searchRef}
        placeholder={t('searchTransaction')}
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
      {isFirstLoad || isSearch || isRefresh ? (
        <Box mt="4" py="4" alignItems="center">
          <Spinner color="primary.500" />
        </Box>
      ) : (
        <FlatList
          mt="4"
          data={list}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
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
      <ActionSheet
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
        screenName="TransactionDetailScreen"
        deleteMutation={useDeleteTransactionMutation}
        deleteFixedCacheKey="delete-transaction"
        downloadPdf={generateDeliveryOrder}
      />
    </Box>
  )
}

export default TransactionScreen
