import demoReducer from '@screens/demoSlice'
import userReducer from '@screens/userSlice'

const rootReducer = {
  demo: demoReducer,
  user: userReducer,
}

export default rootReducer
