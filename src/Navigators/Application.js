import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
import {
  ParentProductScreen,
  ProductDetailScreen,
  ProductScreen,
  ProductVariantScreen,
  SelectProductDetailScreen,
  SelectProductScreen,
} from '@/Screens/Product'
import ScanBarcodeScreen from '@/Screens/Product/ScanBarcodeScreen'
import {
  MasterBuyingStatusDetailScreen,
  MasterBuyingStatusScreen,
  MasterBuyingTypeDetailScreen,
  MasterBuyingTypeScreen,
} from '@/Screens/Master/Buying'
import {
  MasterBrandDetailScreen,
  MasterBrandScreen,
} from '@/Screens/Master/Brand'
import {
  TransactionDetailScreen,
  TransactionOnlineDetailScreen,
  TransactionUpdateScreen,
} from '@/Screens/Transaction'
import { AttendanceCheckInScreen } from '@/Screens/Attendance'
import { BuyingDetailScreen, BuyingUpdateScreen } from '@/Screens/Buying'

const Stack = createNativeStackNavigator()

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
            name="MasterBuyingStatusScreen"
            component={MasterBuyingStatusScreen}
            options={{ headerShown: true, title: t('buyingStatus') }}
          />
          <Stack.Screen
            name="MasterBuyingStatusDetailScreen"
            component={MasterBuyingStatusDetailScreen}
            options={{ headerShown: true, title: t('buyingStatusDetail') }}
          />
          <Stack.Screen
            name="MasterBuyingTypeScreen"
            component={MasterBuyingTypeScreen}
            options={{ headerShown: true, title: t('buyingType') }}
          />
          <Stack.Screen
            name="MasterBuyingTypeDetailScreen"
            component={MasterBuyingTypeDetailScreen}
            options={{ headerShown: true, title: t('buyingTypeDetail') }}
          />
          <Stack.Screen
            name="MasterContactDetailScreen"
            component={MasterContactDetailScreen}
            options={{ headerShown: true, title: t('contactDetail') }}
          />
          <Stack.Screen
            name="MasterBrandScreen"
            component={MasterBrandScreen}
            options={{ headerShown: true, title: t('brand') }}
          />
          <Stack.Screen
            name="MasterBrandDetailScreen"
            component={MasterBrandDetailScreen}
            options={{ headerShown: true, title: t('brandDetail') }}
          />

          {/* Attendance */}

          <Stack.Screen
            name="AttendanceCheckInScreen"
            component={AttendanceCheckInScreen}
            options={{ headerShown: true, title: t('checkIn') }}
          />

          {/* Product */}
          <Stack.Screen
            name="ParentProductScreen"
            component={ParentProductScreen}
            options={{ headerShown: true, title: t('productCategory') }}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{ headerShown: true, title: t('product') }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{ headerShown: true, title: t('productDetail') }}
          />
          <Stack.Screen
            name="ProductVariantScreen"
            component={ProductVariantScreen}
            options={{ headerShown: true, title: t('productVariant') }}
          />
          <Stack.Screen
            name="SelectProductScreen"
            component={SelectProductScreen}
            options={{ headerShown: true, title: t('selectProduct') }}
          />
          <Stack.Screen
            name="SelectProductDetailScreen"
            component={SelectProductDetailScreen}
            options={{ headerShown: true, title: t('selectProduct') }}
          />

          <Stack.Screen
            name="ScanBarcodeScreen"
            component={ScanBarcodeScreen}
            options={{ headerShown: true, title: t('scanBarcode') }}
          />

          {/* Transaction */}
          <Stack.Screen
            name="TransactionDetailScreen"
            component={TransactionDetailScreen}
            options={{ headerShown: true, title: t('transactionDetail') }}
          />
          <Stack.Screen
            name="TransactionUpdateScreen"
            component={TransactionUpdateScreen}
            options={{ headerShown: true, title: t('updateOrTracking') }}
          />
          <Stack.Screen
            name="TransactionOnlineDetailScreen"
            component={TransactionOnlineDetailScreen}
            options={{ headerShown: true, title: t('addOnlineTransaction') }}
          />

          {/* Buying */}
          <Stack.Screen
            name="BuyingDetailScreen"
            component={BuyingDetailScreen}
            options={{ headerShown: true, title: t('buyingDetail') }}
          />
           <Stack.Screen
            name="BuyingUpdateScreen"
            component={BuyingUpdateScreen}
            options={{ headerShown: true, title: t('updateOrTracking') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  )
}

export default ApplicationNavigator
