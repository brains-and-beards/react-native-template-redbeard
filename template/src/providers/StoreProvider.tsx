import store from '@redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { FC } from '@utils/types'

const StoreProvider: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
export default StoreProvider
