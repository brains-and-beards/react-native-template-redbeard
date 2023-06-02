import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'typed-redux-saga'
import { logIn as logInRequest } from '@api/auth'
import { AuthTokens } from '@api/common'
import { Credentials } from '@api/types/auth.types'
import { Failure, Loading, NotRequested, RemoteData, Success, isSuccess } from '@models/RemoteData'
import { RootState } from '@redux/store'
import { getErrorMessage } from '@utils/error'

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

interface UserState {
  authTokens: RemoteData<AuthTokens, Error['message']>
}

const initialState: UserState = {
  authTokens: NotRequested,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInAsync: (state, _action: PayloadAction<Credentials>) => {
      state.authTokens = Loading
    },
    logInAsyncSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.authTokens = Success(action.payload)
    },
    logInAsyncFailure: (state, action: PayloadAction<Error['message']>) => {
      state.authTokens = Failure(action.payload)
    },
  },
})

export const { logInAsync, logInAsyncSuccess, logInAsyncFailure } = userSlice.actions

export const selectAuthTokens = (state: RootState) => state.user.authTokens

export const selectIsLoggedIn = (state: RootState) => {
  const { authTokens } = state.user
  return isSuccess(authTokens) && Boolean(authTokens.data.accessToken)
}

export default userSlice.reducer
