import { watchFetchLatestComicSaga } from '@screens/demoSlice'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([watchFetchLatestComicSaga()])
}
