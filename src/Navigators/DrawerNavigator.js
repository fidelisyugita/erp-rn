import React from 'react'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import {
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
} from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AccountingScreen } from '@/Screens/Accounting'
import { DashboardScreen } from '@/Screens/Dashboard'
import { useTranslation } from 'react-i18next'

const Drawer = createDrawerNavigator()

const getIcon = screenName => {
  switch (screenName) {
    case 'Dashboard':
      return 'view-dashboard'
    case 'Outbox':
      return 'send'
    case 'Favorites':
      return 'heart'
    case 'Archive':
      return 'archive'
    case 'Trash':
      return 'trash-can'
    case 'Spam':
      return 'alert-circle'
    default:
      return undefined
  }
}

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name)
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.500'
                    }
                    size="5"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => {
  const { t } = useTranslation()

  return (
    <Drawer.Navigator
      initialRouteName="AccountingScreen"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t('dashboard'), drawerLabel: t('dashboard') }}
      />
      <Drawer.Screen
        name="Master"
        component={DashboardScreen}
        options={{ title: t('master'), drawerLabel: t('master') }}
      />
      <Drawer.Screen
        name="AccountingScreen"
        component={AccountingScreen}
        options={{ title: t('accounting'), drawerLabel: t('accounting') }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
