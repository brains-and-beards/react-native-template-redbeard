import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@redux/store';
import {Comic} from '@models/ComicModel';
import {
  Failure,
  hasData,
  Loading,
  NotRequested,
  Refreshing,
  RemoteData,
  Success,
} from '@models/RemoteData';

interface DemoScreenState {
  counter: number;
  comic: RemoteData<Comic, Error['message']>;
}

const initialState: DemoScreenState = {
  counter: 420,
  comic: NotRequested,
};

export const demoScreenSlice = createSlice({
  name: 'demoScreen',
  initialState,
  reducers: {
    incrementCounterBy: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    decrementCounterBy: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
    getLatestComicAsync: state => {
      state.comic = hasData(state.comic)
        ? Refreshing(state.comic.data)
        : Loading;
    },
    getLatestComicAsyncSuccess: (state, action: PayloadAction<Comic>) => {
      state.comic = Success(action.payload);
    },
    getLatestComicAsyncFailure: (
      state,
      action: PayloadAction<Error['message']>,
    ) => {
      state.comic = Failure(action.payload);
    },
  },
});

// TODO: remove unnecesary exports if saga integrated into a slice
export const {
  incrementCounterBy,
  decrementCounterBy,
  getLatestComicAsync,
  getLatestComicAsyncSuccess,
  getLatestComicAsyncFailure,
} = demoScreenSlice.actions;

export const selectCounter = (state: RootState) => state.demoScreen.counter;

export const selectComic = (state: RootState) => state.demoScreen.comic;

export default demoScreenSlice.reducer;
