import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { logInAsyncSuccess } from '@api/authSlice'
import { setAuthConfig } from '@api/common'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(middlewares),
})

sagaMiddleware.run(rootSaga)

setAuthConfig({ persistNewTokens: tokens => store.dispatch(logInAsyncSuccess(tokens)) })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
