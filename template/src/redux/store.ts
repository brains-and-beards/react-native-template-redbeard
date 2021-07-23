import {configureStore} from '@reduxjs/toolkit';
import demoScreenReducer from './demoScreen/slice';

const store = configureStore({
  reducer: {
    demoScreen: demoScreenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
