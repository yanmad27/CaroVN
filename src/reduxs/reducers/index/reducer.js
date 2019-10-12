
import { combineReducers } from "redux";
import BoardState from 'reduxs/reducers/board/reducer';
import GameState from 'reduxs/reducers/game/reducer';
import HistoryState from 'reduxs/reducers/history/reducer';

export default
combineReducers({
    BoardState,
    GameState,
    HistoryState,
})