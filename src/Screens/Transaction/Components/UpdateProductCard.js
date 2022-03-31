import React from 'react'
import { Avatar, Box, HStack, Text, VStack } from 'native-base'
import { InputAmount } from '@/Components/Atoms'
import { useTranslation } from 'react-i18next'

const UpdateProductCard = ({ item }) => {
  const { t } = useTranslation()
  return (
    <Box p="4" borderWidth="1" borderColor="gray.200" borderRadius="2" mx="4">
      <HStack justifyContent="space-between">
        <HStack>
          <Avatar
            borderRadius="2"
            size="48px"
            mr="2"
            source={{
              uri: item.imageUrl,
            }}
          />
          <VStack>
            <Text>{item.name}</Text>
            <Text>{item.brand.name}</Text>
          </VStack>
        </HStack>
        <VStack>
          <Text>{item.color}</Text>
          <Text>{item.size}</Text>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between" mt="2">
        <Box alignItems="center">
          <Text mb="1">{t('received')}</Text>
          <InputAmount w="150" />
        </Box>
        <Box alignItems="center">
          <Text mb="1">{t('rejected')}</Text>
          <InputAmount w="150" />
        </Box>
      </HStack>
    </Box>
  )
}

export default UpdateProductCard
