const appState = {
    winner: undefined,
}
const boardState = {
    resetBoard: null,
    boardData: null,
    winner: null,
    winType: null,
    winIndex: null,
    moveHistory: null,
    currentMove: null,
    isX: null,
}

const squareState = {
    test: false,
}

const RootState = {
    app: appState,
    board: boardState,
    square: squareState
};

export default RootState;