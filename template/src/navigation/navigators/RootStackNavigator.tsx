import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { selectIsLoggedIn } from '@api/authSlice'
import useAppSelector from '@hooks/useAppSelector'
import Routes from '@navigation/routes'
import DemoScreen, { DemoScreenParams } from '@screens/DemoScreen'
import LoginScreen, { LoginScreenParams } from '@screens/LoginScreen'
import TranslationsDemoScreen, {
  TranslationsDemoScreenParams,
} from '@screens/TranslationsDemoScreen'

export type RootStackParamList = {
  [Routes.LOGIN_SCREEN]: LoginScreenParams
  [Routes.DEMO_SCREEN]: DemoScreenParams
  [Routes.TRANSLATIONS_DEMO_SCREEN]: TranslationsDemoScreenParams
}

export type RootStackScreenProps<R extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  R
>

const RootStack = createNativeStackNavigator<RootStackParamList>()
const RootStackNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <RootStack.Navigator>
      {!isLoggedIn ? (
        <RootStack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      ) : (
        <RootStack.Group>
          <RootStack.Screen name={Routes.DEMO_SCREEN} component={DemoScreen} />
          <RootStack.Screen
            name={Routes.TRANSLATIONS_DEMO_SCREEN}
            component={TranslationsDemoScreen}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  )
}

export default RootStackNavigator
