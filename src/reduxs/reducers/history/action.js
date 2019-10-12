import ActionTypes from './actionTypes';

export const emitAddNewMoveAction = (newMove) => {
    return {
        type: ActionTypes.ADD_NEW_MOVE,
        payload: newMove,
    }
}

export const emitJumpToMove = (wantToJumpMove) =>{
    return {
        type:ActionTypes.JUMP_TO_MOVE,
        payload:wantToJumpMove
    }
}