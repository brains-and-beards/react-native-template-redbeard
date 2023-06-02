import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'typed-redux-saga'
import { getLatestComic } from '@api/comics'
import { mapComic } from '@api/mappers/comicMappers'
import { Comic } from '@api/types/comic.types'
import {
  Failure,
  Loading,
  NotRequested,
  Refreshing,
  RemoteData,
  Success,
  hasData,
} from '@models/RemoteData'
import { RootState } from '@redux/store'
import { getErrorMessage } from '@utils/error'

export function* fetchLatestComic() {
  try {
    const comic = yield* call(getLatestComic)
    yield* put(getLatestComicAsyncSuccess(mapComic(comic)))
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    yield* put(getLatestComicAsyncFailure(errorMessage))
  }
}

export function* watchGetLatestComicSaga() {
  yield* takeEvery(getLatestComicAsync, fetchLatestComic)
}

interface DemoState {
  counter: number
  comic: RemoteData<Comic, Error['message']>
}

const initialState: DemoState = {
  counter: 420,
  comic: NotRequested,
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
    },
  },
})

export const {
  incrementCounterBy,
  decrementCounterBy,
  getLatestComicAsync,
  getLatestComicAsyncSuccess,
  getLatestComicAsyncFailure,
} = demoSlice.actions

export const selectCounter = (state: RootState) => state.demo.counter

export const selectComic = (state: RootState) => state.demo.comic

export default demoSlice.reducer
