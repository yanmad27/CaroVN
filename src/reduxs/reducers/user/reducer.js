import ActionTypes from './actionTypes';

const INITIAL_STATE = {
    isSignIn: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, isSignIn: action.payload };
        default:
            return { ...state };
    }
}

export default userReducer;