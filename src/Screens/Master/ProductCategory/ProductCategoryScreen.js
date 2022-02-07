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
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'

import { usePagination } from '@/Hooks'
import { useLazyGetProductCategoriesQuery } from '@/Services/modules/product'

const ProductCategoryScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [
    { list, onRefresh, onSearch, onLoadMore, keyExtractor, renderEmpty },
    { isSearch, isRefresh, isFirstLoad },
  ] = usePagination(useLazyGetProductCategoriesQuery)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          key="ghost"
          variant="ghost"
          _icon={{
            as: MaterialIcons,
            name: 'add',
          }}
        />
      ),
    })
  }, [navigation])

  const searchRef = useRef(null)

  const onPressItem = () => {
    searchRef?.current?.blur()
    navigation.navigate('MasterProductCategoryDetailScreen')
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={onPressItem}>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth={1}
              borderColor="coolGray.200"
              py="2"
              bg={isPressed ? 'coolGray.200' : 'white'}
            >
              <Text>{item.name}</Text>
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
        placeholder={t('searchProductCategory')}
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
      {isFirstLoad || isSearch ? (
        <Box mt="4" py="4" alignItems="center">
          <Spinner color="primary.500" />
        </Box>
      ) : (
        <FlatList
          mt="4"
          data={list}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
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
    </Box>
  )
}

export default ProductCategoryScreen
