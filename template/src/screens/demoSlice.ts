import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@redux/store'

interface DemoState {
  counter: number
}

const initialState: DemoState = {
  counter: 420,
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
  },
})

export const { incrementCounterBy, decrementCounterBy } = demoSlice.actions

export const selectCounter = (state: RootState) => state.demo.counter

export default demoSlice.reducer
