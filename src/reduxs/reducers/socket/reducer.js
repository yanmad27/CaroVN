import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    socket: null,
    host: null,
}

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CONNECT:
            return { ...state, socket: action.payload };
        case ActionTypes.JOIN_HOST:
            return { ...state, host: action.payload };
        case ActionTypes.DISCONNECT:
            return { ...state, socket: null };
        case ActionTypes.SEND_MESSAGE:
            return { ...state, };
        case ActionTypes.SEND_MOVE:
            return { ...state, };
        default:
            return { ...state };
    }
}

export default gameReducer;