import { configureStore } from '@reduxjs/toolkit'
import { RenderOptions, render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import reducer from '@redux/rootReducer'
import { RootState } from '@redux/store'

interface Options extends RenderOptions {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof configureStore>
}

function render(
  ui: JSX.Element,
  {
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: Options = {},
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
export * from '@testing-library/react-native'
export { render }

export const createNavigationProps = (params?: { [key: string]: unknown }): unknown => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params,
  },
})
