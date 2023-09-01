import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RenderOptions, render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import reducer from '@redux/rootReducer'
import { RootState } from '@redux/store'

interface Options extends RenderOptions {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof configureStore>
}

export const createTestEnvWrapper = ({
  preloadedState = {},
  store = configureStore({ reducer, preloadedState }),
}: Options) => {
  const TestEnvWrapper = ({ children }: { children: JSX.Element }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    )
  }

  return TestEnvWrapper
}

function render(
  ui: JSX.Element,
  {
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: Options = {},
) {
  return rtlRender(ui, {
    wrapper: createTestEnvWrapper({ preloadedState, store }),
    ...renderOptions,
  })
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
