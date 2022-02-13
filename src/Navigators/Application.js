import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Box } from 'native-base'

import { navigationRef } from './utils'

import DrawerNavigator from './DrawerNavigator'
import { LoginScreen, ForgotPasswordScreen } from '@/Screens/Auth'
import { StartupScreen } from '@/Screens/Startup'
import {
  MasterProductCategoryDetailScreen,
  MasterProductCategoryScreen,
} from '@/Screens/Master/ProductCategory'
import {
  MasterMeasureUnitDetailScreen,
  MasterMeasureUnitScreen,
  MasterProductMeasureUnitScreen,
} from '@/Screens/Master/MeasureUnit'
import {
  MasterTransactionTypeDetailScreen,
  MasterTransactionTypeScreen,
} from '@/Screens/Master/TransactionType'
import {
  MasterTransactionStatusDetailScreen,
  MasterTransactionStatusScreen,
} from '@/Screens/Master/TransactionStatus'
import {
  MasterContactDetailScreen,
  MasterContactScreen,
} from '@/Screens/Master/Contact'
import { ProductDetailScreen } from '@/Screens/Product'
import ScanBarcodeScreen from '@/Screens/Product/ScanBarcodeScreen'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { t } = useTranslation()

  return (
    <Box flex={1}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
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
          <Stack.Screen
            name="MasterMeasureUnitDetailScreen"
            component={MasterMeasureUnitDetailScreen}
            options={{ headerShown: true, title: t('measureUnitDetail') }}
          />
          <Stack.Screen
            name="MasterTransactionTypeScreen"
            component={MasterTransactionTypeScreen}
            options={{ headerShown: true, title: t('transactionType') }}
          />
          <Stack.Screen
            name="MasterTransactionTypeDetailScreen"
            component={MasterTransactionTypeDetailScreen}
            options={{ headerShown: true, title: t('transactionTypeDetail') }}
          />
          <Stack.Screen
            name="MasterTransactionStatusScreen"
            component={MasterTransactionStatusScreen}
            options={{ headerShown: true, title: t('transactionStatus') }}
          />
          <Stack.Screen
            name="MasterTransactionStatusDetailScreen"
            component={MasterTransactionStatusDetailScreen}
            options={{ headerShown: true, title: t('transactionStatusDetail') }}
          />
          <Stack.Screen
            name="MasterContactDetailScreen"
            component={MasterContactDetailScreen}
            options={{ headerShown: true, title: t('contactDetail') }}
          />

          {/* Product */}
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{ headerShown: true, title: t('productDetail') }}
          />
          <Stack.Screen
            name="ScanBarcodeScreen"
            component={ScanBarcodeScreen}
            options={{ headerShown: true, title: t('scanBarcode') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  )
}

export default ApplicationNavigator
