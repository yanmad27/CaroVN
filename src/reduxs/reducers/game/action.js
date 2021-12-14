import ActionTypes from './actionTypes';

export const emitSwitchNextValueAction = () => {
    return {
        type: ActionTypes.SWITCH_NEXT_TURN_VALUE,
        payload: null,
    }
}

export const emitSetWinnerAction = winnerData => {
    return {
        type: ActionTypes.SET_WINNER,
        payload: { ...winnerData },
    }
}

export const emitResetWinnerAction = () => {
    return {
        type: ActionTypes.RESET_WINNER,
        payload: null,
    }
}