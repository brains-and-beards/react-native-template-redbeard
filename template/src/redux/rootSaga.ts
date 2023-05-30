import { all } from 'typed-redux-saga'
import { watchFetchLatestComicSaga } from '@screens/demoSlice'

export default function* rootSaga() {
  yield* all([watchFetchLatestComicSaga()])
}
