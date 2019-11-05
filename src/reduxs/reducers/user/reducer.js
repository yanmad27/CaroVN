import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    isSignIn: false,
    signUpSuccessful: false,
    username: '',
    nickname: '',
    token: '',
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, isSignIn: true, username: action.payload.username, nickname: action.payload.nickname };
        case ActionTypes.SIGN_UP:
            return { ...state, signUpSuccessful: action.payload };
        case ActionTypes.SET_TOKEN:
            return { ...state, token: action.payload };
        case ActionTypes.REMOVE_TOKEN:
            return { ...state, token: '', username: '' }
        default:
            return { ...state };
    }
}

export default userReducer;