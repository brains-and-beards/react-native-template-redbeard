import authReducer from '@api/authSlice'
import demoReducer from '@screens/demoSlice'

const rootReducer = {
  auth: authReducer,
  demo: demoReducer,
}

export default rootReducer
