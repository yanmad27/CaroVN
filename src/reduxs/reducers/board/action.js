import ActionTypes from './actionTypes';

export const emitUpdateBoardDataAction = newMove => {
    console.log("BoardAction:: updateBoard is triggerd..., newMove: ", newMove);
    return {
        type: ActionTypes.UPDATE_BOARD_DATA,
        payload: newMove,
    }
}

export const emitResetBoardDataAction = () => {
    console.log("BoardAction:: resetBoard is triggerd...");
    return {
        type: ActionTypes.RESET_BOARD_DATA,
        payload: null,
    }
}