import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreProvider from 'providers/StoreProvider'
import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import '@localization/i18n'
import RootStackNavigator from '@navigation/navigators/RootStackNavigator'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <SafeAreaProvider>
          <NavigationContainer onReady={SplashScreen.hide}>
            <RootStackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </StoreProvider>
    </QueryClientProvider>
  )
}

export default App
