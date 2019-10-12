import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    nextTurnValue: 'X',
    winnerData: undefined,
}

const reverseNextTurnValue = (value) => {
    console.log(value === 'X' ? 'O' : 'X');
    return value === 'X' ? 'O' : 'X';
}

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SWITCH_NEXT_TURN_VALUE:
            return { ...state, nextTurnValue: reverseNextTurnValue(state.nextTurnValue) };
        case ActionTypes.SET_WINNER:
            return { ...state, winnerData: { ...action.payload } };
        case ActionTypes.RESET_WINNER:
            return { ...state, winnerData: undefined };
        default:
            return { ...state };
    }
}

export default gameReducer;