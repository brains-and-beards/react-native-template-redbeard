import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { REHYDRATE, persistReducer } from 'redux-persist'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { call, takeLatest } from 'typed-redux-saga'
import { AuthTokens, setAuthConfig } from '@api/common'
import { safeStorage } from '@redux/persistence'
import { resetStore } from '@redux/rootActions'
import { RootState } from '@redux/store'

type TopLevelStoreStates = {
  [K in keyof RootState]: RootState[K]
}[keyof RootState]

type SeparatelyPersistedStates<T> = T extends PersistPartial ? T : never

// Payload depends on persist config, it can be any of separately persisted state chunks
type RehydratePayload = Partial<RootState> | SeparatelyPersistedStates<TopLevelStoreStates>

interface RehydrateAction {
  type: typeof REHYDRATE
  key: string
  payload?: RehydratePayload
}

function* setApiAuthConfig(action: ReturnType<typeof resetStore> | RehydrateAction) {
  const isResetStoreAction = resetStore.match(action)

  if (isResetStoreAction) {
    yield* call(setAuthConfig, { accessToken: undefined, refreshToken: undefined })
  } else if (
    action.key === authPersistConfig.key &&
    action.payload &&
    'tokens' in action.payload &&
    action.payload.tokens
  ) {
    yield* call(setAuthConfig, action.payload.tokens)
  }
}

export function* watchAuthTokens() {
  yield* takeLatest([logInAsyncSuccess, REHYDRATE, resetStore], setApiAuthConfig)
}

interface AuthState {
  tokens: AuthTokens | undefined
}

const initialState: AuthState = {
  tokens: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInAsyncSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload
    },
  },
})

export const { logInAsyncSuccess } = authSlice.actions

export const selectAuthTokens = (state: RootState) => state.auth.tokens

export const selectIsLoggedIn = (state: RootState) => {
  const { tokens } = state.auth
  return !!tokens?.accessToken
}

const authPersistConfig = {
  key: authSlice.name,
  storage: safeStorage,
}

export default persistReducer(authPersistConfig, authSlice.reducer)
