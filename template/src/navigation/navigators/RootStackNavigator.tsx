import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '@navigation/routes';
import DemoScreen from '@screens/DemoScreen';

export type RootStackParamList = {
  [Routes.DEMO_SCREEN]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={Routes.DEMO_SCREEN} component={DemoScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
