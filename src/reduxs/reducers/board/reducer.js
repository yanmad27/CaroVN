import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    resetBoard: null,
    boardData: null,
    winner: null,
    winType: null,
    winIndex: null,
    moveHistory: null,
    currentMove: null,
    isX: null,
}

const boardReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_ISX:
            return {...state, isX: action.payload };
        case ActionTypes.SET_BOARD_DATA:
            return {...state, boardData: action.payload };
        case ActionTypes.SET_CURRENT_MOVE:
            return {...state, currentMove: action.payload };
        case ActionTypes.SET_WININDEX:
            return {...state, winIndex: action.payload };
        case ActionTypes.SET_MOVE_HISTORY:
            return {...state, moveHistory: action.payload };
        case ActionTypes.SET_WINNER:
            return {...state, winner: action.payload };
        case ActionTypes.SET_WINTYPE:
            return {...state, winType: action.payload };
        default:
            return {...INITIAL_STATE }
    }
}

export default boardReducer