import store from '@redux/store'
import { FC } from '@utils/types'
import React from 'react'
import { Provider } from 'react-redux'

const StoreProvider: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
export default StoreProvider
