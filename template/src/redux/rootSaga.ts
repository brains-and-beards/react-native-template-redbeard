import { all } from 'typed-redux-saga'
import { watchAuthTokens } from '@api/authSlice'

export default function* rootSaga() {
  yield* all([watchAuthTokens()])
}
