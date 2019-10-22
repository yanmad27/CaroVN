import * as React from 'react';
import { Provider } from 'react-redux';
import RootReducers from 'reduxs/reducers/index/reducer';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import App from 'components/app/App';


const store = createStore(
  RootReducers,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
)

function ReduxRoot() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
