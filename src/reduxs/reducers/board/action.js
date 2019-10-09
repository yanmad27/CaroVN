import ActionTypes from './actionTypes';

export const doSetBoardData = newBoardData => {
    return {
        type: ActionTypes.SET_BOARD_DATA,
        payload: newBoardData,
    }
}

export const doSetWinner = newWinner => {
    return {
        type: ActionTypes.SET_WINNER,
        payload: newWinner,
    }
}

export const doSetWinIndex = newWinIndex => {
    return {
        type: ActionTypes.SET_WININDEX,
        payload: newWinIndex,
    }
}

export const doSetWinType = newWinType => {
    return {
        type: ActionTypes.SET_WINTYPE,
        payload: newWinType,
    }
}

export const doSetMoveHistory = newMoveHistory => {
    return {
        type: ActionTypes.SET_MOVE_HISTORY,
        payload: newMoveHistory,
    }
}

export const doSetCurrentMove = newCurrentMove => {
    return {
        type: ActionTypes.SET_CURRENT_MOVE,
        payload: newCurrentMove,
    }
}

export const doSetIsX = newIsX => {
    return {
        type: ActionTypes.SET_ISX,
        payload: newIsX,
    }
}

export const doSetResetBoard = newResetBoard => {
    return {
        type: ActionTypes.SET_RESET_BOARD,
        payload: newResetBoard,
    }
}
export const setBoardData = (newBoardData) => async(dispatch) => {

    dispatch(doSetBoardData(newBoardData));
}

export const setWinner = (newWinner) => async(dispatch) => {

    dispatch(doSetWinner(newWinner));
}

export const setWinType = (newWinType) => async(dispatch) => {

    dispatch(doSetWinType(newWinType));
}

export const setWinIndex = (newWinIndex) => async(dispatch) => {

    dispatch(doSetWinIndex(newWinIndex));
}

export const setMoveHistory = (newMoveHistory) => async(dispatch) => {

    dispatch(doSetMoveHistory(newMoveHistory));
}

export const setCurrentMove = (newCurrentMove) => async(dispatch) => {

    dispatch(doSetCurrentMove(newCurrentMove));
}

export const setIsX = (newIsX) => async(dispatch) => {

    dispatch(doSetIsX(newIsX));
}