/* eslint-disable import/no-unresolved */
import { combineReducers } from "redux";
import BoardReducer from 'reduxs/reducers/board/reducer';

export default () =>
combineReducers({
    ...BoardReducer,
});