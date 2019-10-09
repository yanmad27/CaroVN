import ActionTypes from './actionTypes';

const doSetBoardData = newBoardData => {
    return {
        type: ActionTypes.SET_BOARD_DATA,
        payload: newBoardData,
    }
}

const doSetWinner = newWinner => {
    return {
        type: ActionTypes.SET_WINNER,
        payload: newWinner,
    }
}

const doSetWinIndex = newWinIndex => {
    return {
        type: ActionTypes.SET_WININDEX,
        payload: newWinIndex,
    }
}

const doSetWinType = newWinType => {
    return {
        type: ActionTypes.SET_WINTYPE,
        payload: newWinType,
    }
}

const doSetMoveHistory = newMoveHistory => {
    return {
        type: ActionTypes.SET_MOVE_HISTORY,
        payload: newMoveHistory,
    }
}

const doSetCurrentMove = newCurrentMove => {
    return {
        type: ActionTypes.SET_CURRENT_MOVE,
        payload: newCurrentMove,
    }
}

const doSetIsX = newIsX => {
    return {
        type: ActionTypes.SET_ISX,
        payload: newIsX,
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