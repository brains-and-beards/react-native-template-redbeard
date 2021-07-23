import {getLatestComic} from '@api/comics';
import {parseComic} from '@models/ComicModel';
import {makeApiCall, SuccessResponse} from '@redux/api/saga';
import {put, takeEvery} from 'redux-saga/effects';
import {
  getLatestComicAsync,
  getLatestComicAsyncFailure,
  getLatestComicAsyncSuccess,
} from './slice';

function* fetchLatestComic(): Generator {
  const response = yield makeApiCall(getLatestComic, {
    onError: getLatestComicAsyncFailure,
  });

  if (response) {
    const {json} = response as SuccessResponse;
    const comic = parseComic(json);
    yield put(getLatestComicAsyncSuccess(comic));
  }
}

export function* watchFetchLatestComic() {
  yield takeEvery(getLatestComicAsync, fetchLatestComic);
}
