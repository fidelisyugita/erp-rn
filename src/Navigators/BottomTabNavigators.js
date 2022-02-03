import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import { CheckIcon, Icon, useTheme } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SalesScreen } from '@/Screens/Sales'
import { AccountingScreen } from '@/Screens/Accounting'

const Tab = createBottomTabNavigator()

const BottomTabNavigators = () => {
  const { t } = useTranslation()

  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[900],
        tabBarInactiveTintColor: colors.gray[500],
      }}
    >
      <Tab.Screen
        options={{
          title: t('accounting'),
          tabBarIcon: ({ size, color }) => (
            <Icon
              as={MaterialCommunityIcons}
              size={size}
              name="calculator"
              color={color}
            />
          ),
        }}
        name="AccountingScreen"
        component={AccountingScreen}
      />
      <Tab.Screen
        options={{
          title: t('sales'),
          tabBarIcon: ({ size, color }) => (
            <Icon
              as={MaterialCommunityIcons}
              size={size}
              name="sale"
              color={color}
            />
          ),
        }}
        name="SalesScreen"
        component={SalesScreen}
      />
      <Tab.Screen
        options={{
          title: t('purchase'),
          tabBarIcon: ({ size, color }) => (
            <Icon
              as={MaterialCommunityIcons}
              size={size}
              name="cart"
              color={color}
            />
          ),
        }}
        name="PurchaseScreen"
        component={SalesScreen}
      />
      <Tab.Screen
        options={{
          title: t('inventory'),
          tabBarIcon: ({ size, color }) => (
            <Icon
              as={MaterialCommunityIcons}
              size={size}
              name="warehouse"
              color={color}
            />
          ),
        }}
        name="InventoryScreen"
        component={SalesScreen}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigators
