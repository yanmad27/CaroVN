import history from 'historyConfig';
import * as UserHandler from 'reduxs/handlers/UserHandler';
import { isNull } from 'util';
import ActionTypes from './actionTypes';


export const emitSignInAction = (username) => {
    console.log("UserAction:: sign in is triggered...");
    return {
        type: ActionTypes.SIGN_IN,
        payload: username,
    }
}

export const emitSignUpAction = () => {
    console.log("UserAction:: sign up is triggered...")
    return {
        type: ActionTypes.SIGN_UP,
        payload: true,
    }
}

export const emitSetTokenAction = (token) => {
    console.log("UserAction:: set token is triggered...")
    return {
        type: ActionTypes.SET_TOKEN,
        payload: token
    }
}

export const emitRemoveTokenAction = () => {
    return {
        type: ActionTypes.REMOVE_TOKEN,
        payload: null
    }
}

export const SignIn = (username, password) => async (dispatch) => {

    const responseData = await UserHandler.SignIn(username, password);
    if (!isNull(responseData)) {

        const { token, user } = responseData;
        const { username: resUser } = user;
        dispatch(emitSetTokenAction(token));
        dispatch(emitSignInAction(resUser));
        history.push('/game');
    }
}

export const SignUp = (username, password) => async (dispatch) => {

    const responseData = await UserHandler.SignUp(username, password);
    console.log("UserAction:: sign up, res data: ", responseData);

    if (responseData.messages.indexOf('Success') !== -1) {

        dispatch(emitSignUpAction(username, password));
        history.push('/signin');
    }
}

export const SetToken = (token) => async (dispatch) => {

    dispatch(emitSetTokenAction(token));
}

export const RemoveToken = () => async (dispatch) => {

    dispatch(emitRemoveTokenAction());
}