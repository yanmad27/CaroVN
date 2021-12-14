import ActionTypes from './actionTypes';

export const emitAddNewMoveAction = newMove => {
    return {
        type: ActionTypes.ADD_NEW_MOVE,
        payload: newMove,
    }
}

export const emitJumpToMove = jumpMove => {
    return {
        type: ActionTypes.JUMP_TO_MOVE,
        payload: jumpMove
    }
}

export const emitResetMoveHistoryAction = () => {
    return {
        type: ActionTypes.RESET_MOVE_HISTORY,
        payload: null,
    }
}

export const addNewMoveAction = newMove => async dispatch => {

    dispatch(emitAddNewMoveAction(newMove));
}