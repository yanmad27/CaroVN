import * as ChatEvents from 'reduxs/handlers/socket/ChatEvents';
import * as GameEvents from 'reduxs/handlers/socket/GameEvents';

import { isNull } from 'util';
import store from '../../../store';


export const disconnect = () => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.disconnect()
    }
}

export const getSocketID = () => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        return socket.id
    }
    return -1;
}

export const emitFindPlayer = () => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.emit(GameEvents.FIND_PLAYER)
    }
}

export const subcribePairPlayer = callback => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        console.log('subcribePairPlayer:: socket: ', socket);
        socket.on(GameEvents.PAIR_PLAYER, data => {
            console.log("in subcribePairPlayer ", data);
            callback(data);
        })
    }
}

export const emitNewMove = dataTranfer => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.emit(GameEvents.NEW_MOVE, dataTranfer);
    }
}

export const subcribeNewMove = callback => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.on(GameEvents.NEW_MOVE, data => {
            callback(data);
        })
    }
}

export const emitNewMessage = dataTranfer => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.emit(ChatEvents.NEW_MESSAGE, dataTranfer);
    }
}

export const subcribeNewMessage = callback => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        console.log('subcribeNewMessage', socket);
        socket.on(ChatEvents.NEW_MESSAGE, data => {
            callback(data);
        })
    }
}

export const emitRequireUndo = dataTranfer => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.emit(GameEvents.REQUIRE_UNDO, dataTranfer);
    }
}

export const subcribeRequireUndo = callback => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.on(GameEvents.REQUIRE_UNDO, data => {
            callback(data);
        })
    }
}

export const emitRequireTie = dataTranfer => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.emit(GameEvents.REQUIRE_TIE, dataTranfer);
    }
}

export const subcribeRequireTie = callback => {
    const { socket } = store.getState().SocketState;
    if (!isNull(socket)) {

        socket.on(GameEvents.REQUIRE_TIE, data => {
            callback(data);
        })
    }
}