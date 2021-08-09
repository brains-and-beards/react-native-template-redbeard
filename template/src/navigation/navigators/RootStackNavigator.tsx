import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '@navigation/routes';
import DemoScreen from '@screens/DemoScreen';
import TranslationsDemoScreen from '@screens/TranslationsDemoScreen';

export type RootStackParamList = {
  [Routes.DEMO_SCREEN]: undefined;
  [Routes.TRANSLATIONS_DEMO_SCREEN]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={Routes.DEMO_SCREEN} component={DemoScreen} />
      <RootStack.Screen
        name={Routes.TRANSLATIONS_DEMO_SCREEN}
        component={TranslationsDemoScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
