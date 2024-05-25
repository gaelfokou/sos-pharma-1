'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '../redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const ReducerLayout = ({ children }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReducerLayout;
