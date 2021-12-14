import RootReducers from 'reduxs/reducers/index/reducer';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

const store = createStore(
    RootReducers,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
)

export default store;