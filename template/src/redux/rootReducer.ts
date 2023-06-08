import { AnyAction, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import authReducer from '@api/authSlice'
import demoReducer from '@screens/demoSlice'
import { storage } from './persistence'
import { resetStore } from './rootActions'

const appReducer = combineReducers({
  auth: authReducer,
  demo: demoReducer,
})

const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
  if (resetStore.match(action)) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
}
export default persistReducer(rootPersistConfig, rootReducer as typeof appReducer)
