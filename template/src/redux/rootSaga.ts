import { all } from 'typed-redux-saga'
import { watchAuthTokens } from '@api/authSaga'
import { watchGetLatestComicSaga } from '@screens/demoSlice'
import { watchLogInSaga } from '@screens/userSlice'

export default function* rootSaga() {
  yield* all([watchAuthTokens(), watchGetLatestComicSaga(), watchLogInSaga()])
}
