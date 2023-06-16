import { REHYDRATE } from 'redux-persist'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { Failure, Loading, RemoteDataStates, Success } from '@api/RemoteData'
import { resetStore } from '@redux/rootActions'
import { logIn } from './auth'
import {
  authSlice,
  logInAsync,
  logInAsyncFailure,
  logInAsyncSuccess,
  watchAuthTokens,
  watchLogInSaga,
} from './authSlice'
import { setAuthConfig } from './common'

const fakeAuthTokens = {
  accessToken: 'FAKE_ACCESS_TOKEN',
  refreshToken: 'FAKE_REFRESH_TOKEN',
}
const fakeCredentials = { username: 'FAKE_USERNAME', password: 'FAKE_PASSWORD' }
const logInErrorMessage = 'Login failed'

describe('#watchAuthTokens', () => {
  it('should set API auth tokens on successful login', () => {
    return expectSaga(watchAuthTokens)
      .call(setAuthConfig, fakeAuthTokens)
      .dispatch(logInAsyncSuccess(fakeAuthTokens))
      .silentRun()
  })

  it('should restore API auth tokens on REHYDRATE auth action', () => {
    const rehydrateAction = {
      type: REHYDRATE,
      key: 'auth',
      payload: {
        tokens: {
          data: fakeAuthTokens,
          type: RemoteDataStates.SUCCESS,
        },
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

describe('#watchLogInSaga', () => {
  it('should log user in and put success action with tokens', () => {
    return expectSaga(watchLogInSaga)
      .provide([[matchers.call.fn(logIn), fakeAuthTokens]])
      .put(logInAsyncSuccess(fakeAuthTokens))
      .dispatch(logInAsync(fakeCredentials))
      .silentRun()
  })

  it('should put log in error action wit error message on auth error', () => {
    return expectSaga(watchLogInSaga)
      .provide([[matchers.call.fn(logIn), throwError(new Error(logInErrorMessage))]])
      .put(logInAsyncFailure(logInErrorMessage))
      .dispatch(logInAsync(fakeCredentials))
      .silentRun()
  })
})

describe('#authSlice', () => {
  const initialState = authSlice.getInitialState()

  describe('#loginAsync', () => {
    it('should change tokens state to Loading', () => {
      const state = authSlice.reducer(initialState, logInAsync(fakeCredentials))
      expect(state.tokens).toEqual(Loading)
    })
  })

  describe('#logInAsyncSuccess', () => {
    it('should store auth tokens', () => {
      const state = authSlice.reducer(initialState, logInAsyncSuccess(fakeAuthTokens))
      expect(state.tokens).toEqual(Success(fakeAuthTokens))
    })
  })

  describe('#logInAsyncFailure', () => {
    it('should store auth error message', () => {
      const state = authSlice.reducer(initialState, logInAsyncFailure(logInErrorMessage))
      expect(state.tokens).toEqual(Failure(logInErrorMessage))
    })
  })
})
