import type { RootStackParamList } from '@navigation/navigators/RootStackNavigator'

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList
  }
}
