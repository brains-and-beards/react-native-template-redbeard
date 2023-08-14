import { decrementCounterBy, demoSlice, incrementCounterBy } from '@screens/demoSlice'

describe('DemoSlice', () => {
  const initialState = demoSlice.getInitialState()

  describe('Demo reducer', () => {
    it('has expected initial state', () => {
      const result = demoSlice.reducer(undefined, { type: 'INIT' })
      expect(result).toEqual(initialState)
    })

    it('set incrementCounterBy state', () => {
      const result = demoSlice.reducer(initialState, {
        type: incrementCounterBy,
        payload: 10,
      })

      expect(result.counter).toEqual(430)
    })

    it('set decrementCounterBy state', () => {
      const result = demoSlice.reducer(initialState, {
        type: decrementCounterBy,
        payload: 10,
      })

      expect(result.counter).toEqual(410)
    })
  })
})
