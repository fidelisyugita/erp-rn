import React from 'react'
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import { useGetProductsQuery } from '@/Services/modules/product'

const MasterProductScreen = () => {
  const { data = [] } = useGetProductsQuery({ params: { page: 0 } })

  const keyExtractor = item => String(item.id)

  const renderItem = ({ item }) => {
    return (
      <Box
        borderBottomWidth="1"
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2"
      >
        <HStack space={3} justifyContent="space-between">
          <Avatar
            borderRadius="2"
            size="48px"
            source={{
              uri: item.imageUrl,
            }}
          />
          <VStack>
            <Text color="coolGray.800" bold>
              {item.name}
            </Text>
            <Text color="coolGray.600">{item.sku}</Text>
          </VStack>
          <Spacer />
          <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
            {item.stock}
          </Text>
        </HStack>
      </Box>
    )
  }

  return (
    <Box flex={1} bgColor="white">
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Box>
  )
}

export default MasterProductScreen
