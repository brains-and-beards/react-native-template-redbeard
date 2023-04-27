import { NavigationContainer } from '@react-navigation/native'
import StoreProvider from 'providers/StoreProvider'
import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import '@localization/i18n'
import RootStackNavigator from '@navigation/navigators/RootStackNavigator'

const App = () => {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer onReady={SplashScreen.hide}>
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  )
}

export default App
