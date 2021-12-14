import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    moveHistory: [],
    currentMove: undefined,
}

const historyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEW_MOVE:
            state.moveHistory.push({ ...action.payload });
            return { ...state, currentMove: action.payload };
        case ActionTypes.JUMP_TO_MOVE:
            return { ...state, currentMove: action.payload };
        case ActionTypes.RESET_MOVE_HISTORY:
            return { ...state, moveHistory: [] };
        default:
            return { ...state };
    }
}

export default historyReducer;