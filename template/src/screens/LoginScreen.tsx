import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Button, StyleSheet } from 'react-native'
import DemoTextInput from '@components/inputs/DemoTextInput'
import MainScreenLayout from '@components/layouts/MainScreenLayout'
import DemoCard from '@components/surfaces/DemoCard'
import { RootStackScreenProps } from '@navigation/navigators/RootStackNavigator'
import Routes from '@navigation/routes'
import { useLogInMutation } from '@remote/auth'

const username = 'FAKE_USERNAME'
const password = 'FAKE_PASSWORD'

export type LoginScreenParams = undefined
const LoginScreen: React.FC<RootStackScreenProps<Routes.LOGIN_SCREEN>> = () => {
  const { t } = useTranslation()
  const { isPending, mutate } = useLogInMutation()

  return (
    <MainScreenLayout>
      <DemoCard style={styles.loginCard}>
        <DemoTextInput editable={false} value={username} />
        <DemoTextInput secureTextEntry editable={false} value={password} />
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={t('loginScreen.logInButton')}
            onPress={() => mutate({ username, password })}
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
