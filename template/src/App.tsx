import 'react-native-gesture-handler';
import '@localization/i18n';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from '@navigation/navigators/RootStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StoreProvider from 'providers/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
