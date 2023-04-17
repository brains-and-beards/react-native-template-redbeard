import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@redux/store'
import { Comic, parseComic } from '@models/ComicModel'
import {
  Failure,
  hasData,
  Loading,
  NotRequested,
  Refreshing,
  RemoteData,
  Success
} from '@models/RemoteData'
import { put, takeEvery } from 'redux-saga/effects'
import { makeApiCall, SuccessResponse } from '@api/apiSaga'
import { getLatestComic } from '@api/comics'

export function* fetchLatestComic(): Generator {
  const response = yield makeApiCall(getLatestComic, {
    onError: getLatestComicAsyncFailure
  })

  if (response) {
    const { json } = response as SuccessResponse
    const comic = parseComic(json)
    yield put(getLatestComicAsyncSuccess(comic))
  }
}

export function* watchFetchLatestComicSaga() {
  yield takeEvery(getLatestComicAsync, fetchLatestComic)
}

interface DemoState {
  counter: number
  comic: RemoteData<Comic, Error['message']>
}

const initialState: DemoState = {
  counter: 420,
  comic: NotRequested
}

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    incrementCounterBy: (state, action: PayloadAction<number>) => {
      state.counter += action.payload
    },
    decrementCounterBy: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload
    },
    getLatestComicAsync: state => {
      state.comic = hasData(state.comic) ? Refreshing(state.comic.data) : Loading
    },
    getLatestComicAsyncSuccess: (state, action: PayloadAction<Comic>) => {
      state.comic = Success(action.payload)
    },
    getLatestComicAsyncFailure: (state, action: PayloadAction<Error['message']>) => {
      state.comic = Failure(action.payload)
    }
  }
})

export const {
  incrementCounterBy,
  decrementCounterBy,
  getLatestComicAsync,
  getLatestComicAsyncSuccess,
  getLatestComicAsyncFailure
} = demoSlice.actions

export const selectCounter = (state: RootState) => state.demo.counter

export const selectComic = (state: RootState) => state.demo.comic

export default demoSlice.reducer
