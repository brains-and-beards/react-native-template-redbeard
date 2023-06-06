import { persistCombineReducers } from 'redux-persist'
import authReducer from '@api/authSlice'
import demoReducer from '@screens/demoSlice'
import { storage } from './persistance'

const rootReducer = {
  auth: authReducer,
  demo: demoReducer,
}

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
}
export default persistCombineReducers(rootPersistConfig, rootReducer)
