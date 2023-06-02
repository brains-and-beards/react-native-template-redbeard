import { takeLatest } from 'typed-redux-saga'
import { logInAsyncSuccess } from '@screens/userSlice'
import { setAuthConfig } from './common'

// eslint-disable-next-line require-yield
function* setApiAuthConfig(action: ReturnType<typeof logInAsyncSuccess>) {
  setAuthConfig(action.payload)
}

export function* watchAuthTokens() {
  // TODO yield* takeLatest([logInAsyncSuccess, REHYDRATE], setApiAuthConfig)
  yield* takeLatest(logInAsyncSuccess, setApiAuthConfig)
}
