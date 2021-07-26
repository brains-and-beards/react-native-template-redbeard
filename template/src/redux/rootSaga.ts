import {all} from 'redux-saga/effects';
import {watchFetchLatestComicSaga} from '@screens/demoSlice';

export default function* rootSaga() {
  yield all([watchFetchLatestComicSaga()]);
}
