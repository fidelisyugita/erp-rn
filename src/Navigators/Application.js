import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Box } from 'native-base'

import { navigationRef } from './utils'

import DrawerNavigator from './DrawerNavigator'
import BottomTabNavigators from './BottomTabNavigators'
import { LoginScreen } from '@/Screens/Auth'
import { StartupScreen } from '@/Screens/Startup'
import { MasterProductScreen } from '@/Screens/Master'
import {
  MasterProductCategoryDetailScreen,
  MasterProductCategoryScreen,
} from '@/Screens/Master/ProductCategory'
import {
  MasterMeasureUnitScreen,
  MasterProductMeasureUnitScreen,
} from '@/Screens/Master/MeasureUnit'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { t } = useTranslation()

  return (
    <Box flex={1}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, headerBackTitleVisible: false }}
        >
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          {/* <Stack.Screen name="Dashboard" component={BottomTabNavigators} /> */}
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MasterProductScreen"
            component={MasterProductScreen}
            options={{ headerShown: true, title: t('product') }}
          />
          <Stack.Screen
            name="MasterProductCategoryScreen"
            component={MasterProductCategoryScreen}
            options={{ headerShown: true, title: t('productCategory') }}
          />
          <Stack.Screen
            name="MasterProductCategoryDetailScreen"
            component={MasterProductCategoryDetailScreen}
            options={{ headerShown: true, title: t('productCategoryDetail') }}
          />
          <Stack.Screen
            name="MasterMeasureUnitScreen"
            component={MasterMeasureUnitScreen}
            options={{ headerShown: true, title: t('measureUnit') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  )
}

export default ApplicationNavigator
