import { AnyAction, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import authReducer from '@api/authSlice'
import demoReducer from '@screens/demoSlice'
import { storage } from './persistence'
import { resetStore } from './rootActions'

const rootReducer = combineReducers({
  auth: authReducer,
  demo: demoReducer,
})

const rootReducerWithReset = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
  if (resetStore.match(action)) {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
}
export default persistReducer(rootPersistConfig, rootReducerWithReset as typeof rootReducer)
