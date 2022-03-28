import React from 'react'
import { Avatar, Box, HStack, Pressable, Text, VStack } from 'native-base'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const TransactionCard = ({ item, onPress }) => {
  const { t } = useTranslation()
  return (
    <Pressable onPress={() => onPress?.(item)}>
      {({ isPressed }) => {
        return (
          <Box
            borderWidth={1}
            borderColor="coolGray.200"
            p="4"
            bg={isPressed ? 'coolGray.200' : 'white'}
            borderRadius="sm"
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mb="3"
              pb="2"
              borderBottomWidth={1}
              borderBottomColor="coolGray.200"
            >
              <VStack>
                <Text bold>{item.invoiceCode}</Text>
                <Text color="gray.500">
                  {item.updatedAt
                    ? moment(item.updatedAt).format('D MMM YYYY')
                    : '-'}
                </Text>
              </VStack>
              {item?.contact?.name ? (
                <Box p="1" bgColor="primary.100">
                  <Text color="primary.500">{item?.contact?.name || '-'}</Text>
                </Box>
              ) : null}
            </HStack>
            <HStack mb="2">
              <Avatar
                borderRadius="2"
                size="48px"
                mr="2"
                source={{
                  uri: item?.products[0]?.imageUrl,
                }}
              />
              <VStack>
                <Text bold numberOfLines={1}>
                  {item?.products[0]?.name || ''} {t('size')}{' '}
                  {item?.products[0]?.size || ''}
                </Text>
                <Text color="gray.500">
                  {item?.products[0]?.amount || 0}{' '}
                  {item?.products[0]?.measureUnit?.name}
                </Text>
              </VStack>
            </HStack>
            {item?.products.length > 1 ? (
              <Text color="gray.500">
                {t('otherProducts', { total: item?.products.length })}
              </Text>
            ) : null}
          </Box>
        )
      }}
    </Pressable>
  )
}

export default TransactionCard
