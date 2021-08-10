import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Routes from '@navigation/routes';
import DemoScreen, {DemoScreenParams} from '@screens/DemoScreen';
import TranslationsDemoScreen, {
  TranslationsDemoScreenParams,
} from '@screens/TranslationsDemoScreen';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  [Routes.DEMO_SCREEN]: DemoScreenParams;
  [Routes.TRANSLATIONS_DEMO_SCREEN]: TranslationsDemoScreenParams;
};

export type RootNavigationProp<R extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, R>;

export type RootRouteProp<R extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  R
>;

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
