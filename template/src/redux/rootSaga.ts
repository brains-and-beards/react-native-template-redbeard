import {all} from 'redux-saga/effects';
import {watchFetchLatestComic} from './demoScreen/saga';

export default function* rootSaga() {
  yield all([watchFetchLatestComic()]);
}
