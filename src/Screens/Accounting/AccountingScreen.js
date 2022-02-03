import React from 'react'
import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import { ACCOUNTING_MENU } from '@/Data/Constant'
import { ACCOUNTING_MENU_VALUE } from '@/Data/Dummy'

const AccountingScreen = () => {
  const { t } = useTranslation()

  const viewDashboard = () => {}

  const onPressMenu = item => {}

  const keyExtractor = item => String(item.id)

  const renderItem = ({ item }) => {
    return (
      <Pressable mt="8" onPress={() => onPressMenu(item)}>
        <Box borderBottomWidth={2} borderBottomColor="gray.300">
          <HStack space="3" justifyContent="space-between">
            <Text fontSize="xl">{item.label}</Text>
            <Text fontSize="xl">{ACCOUNTING_MENU_VALUE[item.value]}</Text>
          </HStack>
        </Box>
      </Pressable>
    )
  }

  return (
    <Box flex={1} backgroundColor="white" p="4">
      {/* Header */}
      <HStack>
        <Avatar
          bg="primary.500"
          source={{
            uri: 'https://bit.ly/broken-link',
          }}
        >
          A
        </Avatar>
        <Box ml="2">
          <Text>User: Admin 1</Text>
          <Text>Position: Accounting</Text>
        </Box>
      </HStack>

      <Heading mt="6">{t('accounting')}</Heading>

      <Pressable mt="8" onPress={viewDashboard}>
        <Box
          alignSelf="flex-start"
          borderBottomWidth={2}
          borderBottomColor="gray.300"
        >
          <Text fontSize="xl">{t('viewDashboard')}</Text>
        </Box>
      </Pressable>

      {/* List Menu Accounting */}
      <FlatList
        mt="8"
        data={ACCOUNTING_MENU}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Box>
  )
}

export default AccountingScreen
