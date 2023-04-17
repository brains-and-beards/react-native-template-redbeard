import 'react-native-gesture-handler/jestSetup'

jest.useFakeTimers()

const customGlobal = global
customGlobal.fetch = require('jest-fetch-mock')

// react-native-config-node: read env variables from .env.example
process.env.NODE_ENV = 'example'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {}

  return Reanimated
})
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: jest.fn() },
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {})
      }
    }
  }
}))
jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn()
}))
