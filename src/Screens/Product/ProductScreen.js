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
import { ActionSheet, ProductCard } from '@/Components/Organisms'
import {
  useLazyGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useDownloadPdfProductMutation,
} from '@/Services/modules/product'
import numbro from 'numbro'
import { generatePdfProduct } from '@/Helper/PdfHelper'

const ProductScreen = ({ navigation, route }) => {
  const paramItem = route.params?.item || {}

  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isCanAdd } = useAccess()
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
  ] = usePagination(useLazyGetProductsQuery, {
    params: { categoryId: paramItem?.id || '' },
  })

  const [
    deleteTrigger,
    { isSuccess: isSuccessDelete, reset: resetDelete },
  ] = useDeleteProductMutation({
    fixedCacheKey: 'delete-product',
  })

  const [
    addTrigger,
    { isSuccess: isSuccessAdd, reset: resetAdd },
  ] = useAddProductMutation({
    fixedCacheKey: 'add-product',
  })

  const [
    editTrigger,
    { isSuccess: isSuccessEdit, reset: resetEdit },
  ] = useEditProductMutation({
    fixedCacheKey: 'edit-product',
  })

  const [selectedItem, setSelectedItem] = React.useState({})

  React.useLayoutEffect(() => {
    if (isCanAdd) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            onPress={() => {
              navigation.navigate('ProductDetailScreen', {
                type: 'add',
              })
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
    return <ProductCard item={item} onPress={onPressItem} />
  }

  return (
    <Box flex="1" bgColor="white" paddingX="4">
      <Input
        ref={searchRef}
        placeholder={t('searchProduct')}
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
        screenName="ProductDetailScreen"
        deleteMutation={useDeleteProductMutation}
        deleteFixedCacheKey="delete-product"
        // downloadPdfMutation={useDownloadPdfProductMutation}
        // downloadFixedCacheKey="download-product-pdf"
        // downloadOptions={{
        //   url: `product/pdf/${selectedItem?.id}`,
        //   method: 'POST',
        // }}
        // downloadPdf={generatePdfProduct}
      />
    </Box>
  )
}

export default ProductScreen
