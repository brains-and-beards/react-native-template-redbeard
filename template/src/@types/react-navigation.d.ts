// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {RootStackParamList} from '@navigation/navigators/RootStackNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
