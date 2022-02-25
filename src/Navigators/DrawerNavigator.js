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
import { MasterContactScreen } from '@/Screens/Master/Contact'
import { TransactionScreen } from '@/Screens/Transaction'
import { useGetProfileQuery } from '@/Services/modules/users'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AttendanceScreen } from '@/Screens/Attendance'

const Drawer = createDrawerNavigator()

const getIcon = screenName => {
  const { t } = useTranslation()

  switch (screenName) {
    case t('dashboard'):
      return 'view-dashboard'
    case t('attendance'):
      return 'account'
    case t('dataMaster'):
      return 'database'
    case t('product'):
      return 'cube'
    case t('contact'):
      return 'contacts'
    case t('transaction'):
      return 'script-text-outline'
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
    logoutRequest({ body: {} })
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
            {props.state.routeNames.map((name, index) => {
              return (
                <CustomDrawerItem
                  key={name}
                  name={name}
                  isActive={index === props.state.index}
                  onPress={() => props.navigation.navigate(name)}
                />
              )
            })}
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

  const { isSuccess: isSuccessRefreshToken } = useRefreshTokenQuery(
    { body: { refreshToken } },
    { pollingInterval: 1000 * 60 * 59, skip: !refreshToken }, //pool every 59 minute
  )

  const {
    data: profile,
    isError: isErrorProfile,
    isSuccess: isSuccessProfile,
    refetch: refetchProfile,
  } = useGetProfileQuery()

  useEffect(() => {
    if (isErrorProfile && isSuccessRefreshToken) {
      refetchProfile()
    }
  }, [isErrorProfile])

  useEffect(() => {
    if (!profile?.isAttendToday && isSuccessProfile) {
      navigateAndSimpleReset('AttendanceCheckInScreen')
    }
  }, [profile, isSuccessProfile])

  if (!profile?.isAttendToday) {
    return <Box flex={1} /> // to-do change with text need to attendance first
  }

  return (
    <Drawer.Navigator
      initialRouteName={t('dashboard')}
      screenOptions={{
        contentContainerStyle: { paddingTop: 0 },
        headerTitleAlign: 'center',
      }}
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
        name={t('attendance')}
        component={AttendanceScreen}
        options={{ title: t('attendance'), drawerLabel: t('attendance') }}
      />
      {/* <Drawer.Screen
        name={t('dataMaster')}
        component={MasterScreen}
        options={{ title: t('dataMaster'), drawerLabel: t('dataMaster') }}
      /> */}
      <Drawer.Screen
        name={t('contact')}
        component={MasterContactScreen}
        options={{ title: t('contact'), drawerLabel: t('contact') }}
      />
      <Drawer.Screen
        name={t('product')}
        component={ProductScreen}
        options={{ title: t('product'), drawerLabel: t('product') }}
      />
      <Drawer.Screen
        name={t('transaction')}
        component={TransactionScreen}
        options={{ title: t('transaction'), drawerLabel: t('transaction') }}
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
