import { REHYDRATE } from 'redux-persist'
import { expectSaga } from 'redux-saga-test-plan'
import { resetStore } from '@redux/rootActions'
import { authSlice, logInAsyncSuccess, watchAuthTokens } from './authSlice'
import { setAuthConfig } from './common'

const fakeAuthTokens = {
  accessToken: 'FAKE_ACCESS_TOKEN',
  refreshToken: 'FAKE_REFRESH_TOKEN',
}

describe('#watchAuthTokens', () => {
  it('should restore API auth tokens on REHYDRATE auth action', () => {
    const rehydrateAction = {
      type: REHYDRATE,
      key: 'auth',
      payload: {
        tokens: fakeAuthTokens,
        _persist: {
          rehydrated: true,
          version: -1,
        },
      },
    }
    return expectSaga(watchAuthTokens)
      .call(setAuthConfig, fakeAuthTokens)
      .dispatch(rehydrateAction)
      .silentRun()
  })

  it('should clear API auth tokens on store reset action', () => {
    const fakeBlankAuthTokens = {
      accessToken: undefined,
      refreshToken: undefined,
    }
    return expectSaga(watchAuthTokens)
      .call(setAuthConfig, fakeBlankAuthTokens)
      .dispatch(resetStore())
      .silentRun()
  })
})

describe('#authSlice', () => {
  const initialState = authSlice.getInitialState()

  describe('#logInAsyncSuccess', () => {
    it('should store auth tokens', () => {
      const state = authSlice.reducer(initialState, logInAsyncSuccess(fakeAuthTokens))
      expect(state.tokens).toEqual(fakeAuthTokens)
    })
  })
})
