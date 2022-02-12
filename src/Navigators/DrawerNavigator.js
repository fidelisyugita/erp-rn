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
import { useDispatch } from 'react-redux'
import { reset } from '@/Store/Session'
import { navigateAndSimpleReset } from './utils'
import { MasterScreen } from '@/Screens/Master'
import {
  useLogoutMutation,
  useRefreshTokenMutation,
  useRefreshTokenQuery,
} from '@/Services/modules/auth'
import { ProductScreen } from '@/Screens/Product'

const Drawer = createDrawerNavigator()

const getIcon = screenName => {
  const { t } = useTranslation()

  switch (screenName) {
    case t('dashboard'):
      return 'view-dashboard'
    case t('master'):
      return 'database'
    case t('product'):
      return 'cube'
    case t('archive'):
      return 'archive'
    case t('trash'):
      return 'trash-can'
    case t('signOut'):
      return 'logout'
    default:
      return '-'
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
  const { t } = useTranslation()

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
            {loginPayload?.name}
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
            <CustomDrawerItem name={t('signOut')} onPress={signOut} />
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
      initialRouteName={t('dashboard')}
      screenOptions={{ contentContainerStyle: { paddingTop: 0 }, headerTitleAlign:'center' }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={t('dashboard')}
        component={DashboardScreen}
        options={{
          title: t('dashboard'),
          drawerLabel: t('dashboard'),
        }}
      />
      <Drawer.Screen
        name={t('master')}
        component={MasterScreen}
        options={{ title: t('master'), drawerLabel: t('master') }}
      />
      <Drawer.Screen
        name={t('product')}
        component={ProductScreen}
        options={{ title: t('product'), drawerLabel: t('product') }}
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
