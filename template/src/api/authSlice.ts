import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { REHYDRATE, persistReducer } from 'redux-persist'
import { call, put, takeLatest, takeLeading } from 'typed-redux-saga'
import { logIn as logInRequest } from '@api/auth'
import { AuthTokens, setAuthConfig } from '@api/common'
import { Credentials } from '@api/types/auth.types'
import { Failure, Loading, NotRequested, RemoteData, Success, isSuccess } from '@models/RemoteData'
import { safeStorage } from '@redux/persistance'
import { RootState } from '@redux/store'
import { getErrorMessage } from '@utils/error'

type ReducersUnion = {
  [K in keyof RootState]: RootState[K]
}[keyof RootState]

interface RehydrateAction {
  type: typeof REHYDRATE
  key: string
  // Payload depends on your persist config, it can be any of your separately persisted state chunks
  payload?: Partial<RootState> | ReducersUnion
}

// eslint-disable-next-line require-yield
function* setApiAuthConfig(action: ReturnType<typeof logInAsyncSuccess> | RehydrateAction) {
  const isLoginAction = action.type === logInAsyncSuccess.type

  if (isLoginAction) {
    setAuthConfig(action.payload)
  } else if (
    action.key === authPersistConfig.key &&
    action.payload &&
    'tokens' in action.payload &&
    isSuccess(action.payload.tokens)
  ) {
    setAuthConfig(action.payload.tokens.data)
  }
}

export function* watchAuthTokens() {
  yield* takeLatest([logInAsyncSuccess, REHYDRATE], setApiAuthConfig)
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

const authPersistConfig = {
  key: authSlice.name,
  storage: safeStorage,
}

export default persistReducer(authPersistConfig, authSlice.reducer)
