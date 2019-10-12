import createDefaultBoard from 'reduxs/handlers/boardHandler';
import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    boardData: createDefaultBoard(),
}

const boardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_BOARD_DATA: {
            const { col, row, value } = action.payload;
            const { boardData: newBoardData } = state;
            newBoardData[row][col] = value;
            return { ...state, boardData: newBoardData };
        }
        case ActionTypes.RESET_BOARD_DATA:
            return { boardData: createDefaultBoard() };
        default:
            return { ...state };
    }
}

export default boardReducer