import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'components/app/App';
import { createStore } from 'redux';
import RootReducers from 'reduxs/reducers/index/reducer';

const store = createStore(RootReducers);

function ReduxRoot() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
