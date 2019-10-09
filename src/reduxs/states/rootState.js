/* eslint-disable import/no-unresolved */
import createDefaultBoard from 'reduxs/handlers/boardHandler';

const RootState = {
    boardData: createDefaultBoard(),
    resetBoard: false,
    winner: undefined,
    winIndex: undefined,
    winType: undefined,
    moveHistory: [],
    currentMove: undefined,
    isX: true,
    showNewMoveFirst: true,
};

export default RootState;