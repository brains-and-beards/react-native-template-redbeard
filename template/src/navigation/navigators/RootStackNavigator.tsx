import React from 'react'
import Routes from '@navigation/routes'
import DemoScreen, { DemoScreenParams } from '@screens/DemoScreen'
import TranslationsDemoScreen, {
  TranslationsDemoScreenParams
} from '@screens/TranslationsDemoScreen'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  [Routes.DEMO_SCREEN]: DemoScreenParams
  [Routes.TRANSLATIONS_DEMO_SCREEN]: TranslationsDemoScreenParams
}

export type RootStackScreenProps<R extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  R
>

const RootStack = createNativeStackNavigator<RootStackParamList>()
const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={Routes.DEMO_SCREEN} component={DemoScreen} />
      <RootStack.Screen name={Routes.TRANSLATIONS_DEMO_SCREEN} component={TranslationsDemoScreen} />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator
