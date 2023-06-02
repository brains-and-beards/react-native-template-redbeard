import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { call, put, takeLatest, takeLeading } from 'typed-redux-saga'
import { logIn as logInRequest } from '@api/auth'
import { AuthTokens, setAuthConfig } from '@api/common'
import { Credentials } from '@api/types/auth.types'
import { Failure, Loading, NotRequested, RemoteData, Success, isSuccess } from '@models/RemoteData'
import { RootState } from '@redux/store'
import { getErrorMessage } from '@utils/error'

// eslint-disable-next-line require-yield
function* setApiAuthConfig(action: ReturnType<typeof logInAsyncSuccess>) {
  setAuthConfig(action.payload)
}

export function* watchAuthTokens() {
  // TODO yield* takeLatest([logInAsyncSuccess, REHYDRATE], setApiAuthConfig)
  yield* takeLatest(logInAsyncSuccess, setApiAuthConfig)
}

function* logIn(action: ReturnType<typeof logInAsync>) {
  try {
    const { accessToken, refreshToken } = yield* call(logInRequest, action.payload)
    yield* put(logInAsyncSuccess({ accessToken, refreshToken }))
  } catch (error) {
    yield* put(logInAsyncFailure(getErrorMessage(error)))
  }
}

export function* watchLogInSaga() {
  yield* takeLeading(logInAsync, logIn)
}

interface AuthState {
  tokens: RemoteData<AuthTokens, Error['message']>
}

const initialState: AuthState = {
  tokens: NotRequested,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInAsync: (state, _action: PayloadAction<Credentials>) => {
      state.tokens = Loading
    },
    logInAsyncSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = Success(action.payload)
    },
    logInAsyncFailure: (state, action: PayloadAction<Error['message']>) => {
      state.tokens = Failure(action.payload)
    },
  },
})

export const { logInAsync, logInAsyncSuccess, logInAsyncFailure } = authSlice.actions

export const selectAuthTokens = (state: RootState) => state.auth.tokens

export const selectIsLoggedIn = (state: RootState) => {
  const { tokens } = state.auth
  return isSuccess(tokens) && Boolean(tokens.data.accessToken)
}

export default authSlice.reducer
