import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { Box } from 'native-base'
import { LoginScreen } from '@/Screens/Auth'
import { StartupScreen } from '@/Screens/Startup'
import BottomTabNavigators from './BottomTabNavigators'
import DrawerNavigator from './DrawerNavigator'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <Box flex={1} safeArea>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          {/* <Stack.Screen name="Dashboard" component={BottomTabNavigators} /> */}
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  )
}

export default ApplicationNavigator
