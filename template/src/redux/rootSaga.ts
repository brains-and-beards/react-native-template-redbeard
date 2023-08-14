import { all } from 'typed-redux-saga'
import { watchAuthTokens } from '@api/authSlice'
import { watchGetLatestComicSaga } from '@screens/demoSlice'

export default function* rootSaga() {
  yield* all([watchAuthTokens(), watchGetLatestComicSaga()])
}
