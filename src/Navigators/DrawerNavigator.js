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
import useSession from '@/Hooks/useSession'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'
import { reset } from '@/Store/Session'
import { navigateAndSimpleReset } from './utils'
import { MasterScreen } from '@/Screens/Master'
import {
  useLogoutMutation,
  useRefreshTokenMutation,
  useRefreshTokenQuery,
} from '@/Services/modules/auth'

const Drawer = createDrawerNavigator()

const getIcon = screenName => {
  switch (screenName) {
    case 'Dashboard':
      return 'view-dashboard'
    case 'Master':
      return 'database'
    case 'Favorites':
      return 'heart'
    case 'Archive':
      return 'archive'
    case 'Trash':
      return 'trash-can'
    case 'SignOut':
      return 'logout'
    default:
      return undefined
  }
}

const CustomDrawerItem = ({ navigation, name, isActive, onPress }) => {
  return (
    <Pressable
      px="5"
      py="3"
      rounded="md"
      bg={isActive ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
      onPress={event => {
        onPress?.()
      }}
    >
      <HStack space="7" alignItems="center">
        <Icon
          color={isActive ? 'primary.500' : 'gray.500'}
          size="5"
          as={<MaterialCommunityIcons name={getIcon(name)} />}
        />
        <Text fontWeight="500" color={isActive ? 'primary.500' : 'gray.700'}>
          {name}
        </Text>
      </HStack>
    </Pressable>
  )
}

const CustomDrawerContent = props => {
  const { loginPayload } = useSession()
  const dispatch = useDispatch()
  const [logoutRequest] = useLogoutMutation()

  const signOut = () => {
    logoutRequest()
    dispatch(reset())
    navigateAndSimpleReset('LoginScreen')
  }

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {loginPayload?.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <CustomDrawerItem
                key={name}
                name={name}
                isActive={index === props.state.index}
                onPress={() => props.navigation.navigate(name)}
              />
            ))}
            <CustomDrawerItem name="SignOut" onPress={signOut} />
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => {
  const { t } = useTranslation()
  const { refreshToken } = useSession()

  const { data } = useRefreshTokenQuery(
    { body: { refreshToken } },
    { pollingInterval: 1000 * 60 * 59, skip: !refreshToken }, //pool every 59 minute
  )

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ contentContainerStyle: { paddingTop: 0 } }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: t('dashboard'),
          drawerLabel: t('dashboard'),
        }}
      />
      <Drawer.Screen
        name="Master"
        component={MasterScreen}
        options={{ title: t('master'), drawerLabel: t('master') }}
      />
      {/* <Drawer.Screen
        name="AccountingScreen"
        component={AccountingScreen}
        options={{ title: t('accounting'), drawerLabel: t('accounting') }}
      /> */}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
