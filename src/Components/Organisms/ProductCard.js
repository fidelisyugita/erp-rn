import React from 'react'
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base'

const ProductCard = ({ item, onPress }) => {
  return (
    <Pressable onPress={() => onPress?.(item)}>
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
                  uri: item.imageUrl,
                }}
              />
              <VStack>
                <Text color="coolGray.800" bold>
                  {item.name}
                </Text>
                <Text color="coolGray.600">{item.brand?.name}</Text>
              </VStack>
              <Spacer />
              <VStack>
                <Text fontSize="xs" color="coolGray.800" textAlign="right">
                  {item.color}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )
      }}
    </Pressable>
  )
}

export default ProductCard
