import io from 'socket.io-client';
import ActionTypes from './actionTypes';

const server = `http://localhost:8013/`;

export const emitConnectAction = () => {
    const socket = io(server);
    console.log("SocketAction:: sign in is triggered...");
    return {
        type: ActionTypes.CONNECT,
        payload: socket,
    }
}

export const emitJoinHostAction = host => {
    console.log("SocketAction::emitJoinHostAction is triggered... host: ", host)
    return {
        type: ActionTypes.JOIN_HOST,
        payload: host,
    }
}

export const emitDisconnectAction = () => {
    console.log("SocketAction:: sign up is triggered...")
    return {
        type: ActionTypes.DISCONNECT,
        payload: null,
    }
}

export const emitSendMessageAction = (message) => {
    console.log("SocketAction:: set token is triggered...")
    return {
        type: ActionTypes.SEND_MESSAGE,
        payload: message
    }
}

export const emitSendMoveAction = (move) => {
    console.log("SocketAction:: set token is triggered...")
    return {
        type: ActionTypes.SEND_MOVE,
        payload: move
    }
}

export const Connect = () => async (dispatch) => {

    dispatch(emitConnectAction());
}

export const JoinHost = host => async (dispatch) => {
    console.log("zo k m");
    dispatch(emitJoinHostAction(host));
}

export const Disconnect = () => async (dispatch) => {

    dispatch(emitDisconnectAction());
}