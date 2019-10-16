import * as React from 'react';
import { Provider } from 'react-redux';
import Game from 'components/game/Game';
import RootReducers from 'reduxs/reducers/index/reducer';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const store = createStore(
  RootReducers,
  applyMiddleware(logger)
)

function ReduxRoot() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default ReduxRoot;
