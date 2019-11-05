import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'components/app/App';
import store from './store';


function ReduxRoot() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
