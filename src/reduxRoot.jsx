/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'components/app/App';
import { createStore } from 'redux';
import RootReducers from 'reduxs/reducers/board/reducer';

const store = createStore(RootReducers);

function ReduxRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
