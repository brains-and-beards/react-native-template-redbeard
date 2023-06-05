import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import authReducer from '@api/authSlice'
import demoReducer from '@screens/demoSlice'
import storage from './persistance'

const rootReducer = combineReducers({
  auth: authReducer,
  demo: demoReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

export default persistReducer(persistConfig, rootReducer)
