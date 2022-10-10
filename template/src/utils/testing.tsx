import React from 'react';
import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import reducer from '@redux/rootReducer';
import {RootState} from '@redux/store';

interface Options extends RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

function render(
  ui: JSX.Element,
  {
    preloadedState,
    store = configureStore({reducer, preloadedState}),
    ...renderOptions
  }: Options = {},
) {
  function Wrapper({children}: {children: JSX.Element}) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}
export * from '@testing-library/react-native';
export {render};

export const createNavigationProps = (params?: {[key: string]: any}): any => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params,
  },
});
