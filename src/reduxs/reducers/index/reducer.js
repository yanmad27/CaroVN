
import { combineReducers } from "redux";
import GameState from 'reduxs/reducers/game/reducer';
import UserState from 'reduxs/reducers/user/reducer';
import BoardState from 'reduxs/reducers/board/reducer';
import HistoryState from 'reduxs/reducers/history/reducer';

export default
    combineReducers({
        UserState,
        GameState,
        BoardState,
        HistoryState,
    })