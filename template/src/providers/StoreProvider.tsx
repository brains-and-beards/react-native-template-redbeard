import store from '@redux/store';
import React from 'react';
import {Provider} from 'react-redux';

const StoreProvider: React.FC = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};
export default StoreProvider;