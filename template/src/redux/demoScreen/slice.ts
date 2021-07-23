import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@redux/store';

interface DemoScreenState {
  counter: number;
}

const initialState: DemoScreenState = {
  counter: 420,
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
  },
});

export const {incrementCounterBy, decrementCounterBy} = demoScreenSlice.actions;

export const selectCounter = (state: RootState) => state.demoScreen.counter;

export default demoScreenSlice.reducer;
