import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Button, StyleSheet } from 'react-native'
import { logInAsync, selectAuthTokens } from '@api/authSlice'
import DemoTextInput from '@components/inputs/DemoTextInput'
import MainScreenLayout from '@components/layouts/MainScreenLayout'
import DemoCard from '@components/surfaces/DemoCard'
import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'
import { RootStackScreenProps } from '@navigation/navigators/RootStackNavigator'
import Routes from '@navigation/routes'
import { isLoading } from '@utils/api'

const username = 'FAKE_USERNAME'
const password = 'FAKE_PASSWORD'

export type LoginScreenParams = undefined
const LoginScreen: React.FC<RootStackScreenProps<Routes.LOGIN_SCREEN>> = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const authTokensRequest = useAppSelector(selectAuthTokens)

  return (
    <MainScreenLayout>
      <DemoCard style={styles.loginCard}>
        <DemoTextInput editable={false} value={username} />
        <DemoTextInput secureTextEntry editable={false} value={password} />
        {isLoading(authTokensRequest) ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={t('loginScreen.logInButton')}
            onPress={() => dispatch(logInAsync({ username, password }))}
          />
        )}
      </DemoCard>
    </MainScreenLayout>
  )
}

const styles = StyleSheet.create({
  loginCard: {
    rowGap: 30,
  },
})

export default LoginScreen
