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
  HStack,
  Avatar,
  VStack,
  Spacer,
  Button,
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import numbro from 'numbro'

import { usePagination } from '@/Hooks'
import { useLazyGetProductsQuery } from '@/Services/modules/product'
import { selectProduct } from '@/Store/Product'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '@/Components/Organisms'

const SelectProductScreen = ({ navigation, route }) => {
  const paramItem = route.params?.item || {}

  const { productSelected } = useSelector(state => state.product)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const { colors } = useTheme()
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

  const searchRef = useRef(null)

  const onPressItem = item => {
    searchRef?.current?.blur()
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
        <>
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
        </>
      )}
    </Box>
  )
}

export default SelectProductScreen
