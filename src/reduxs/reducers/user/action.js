import history from 'historyConfig';
import * as UserHandler from 'reduxs/handlers/UserHandler';
import * as SocketActions from 'reduxs/reducers/socket/action';
import { isNull } from 'util';
import ActionTypes from './actionTypes';

export const emitSignInAction = (user) => {
    console.log("UserAction:: sign in is triggered...");
    return {
        type: ActionTypes.SIGN_IN,
        payload: user,
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

export const emitUpdateInfoAction = newInfo => {
    return {
        type: ActionTypes.UPDATE_INFO,
        payload: newInfo,
    }
}

export const SignIn = (username, password) => async (dispatch) => {

    const responseData = await UserHandler.SignIn(username, password);
    if (!isNull(responseData)) {

        const { token, user } = responseData;
        dispatch(emitSetTokenAction(token));
        dispatch(emitSignInAction(user));
        dispatch(SocketActions.emitConnectAction());
        history.push('/main');
    }
}

export const SignUp = (nickname, username, password) => async (dispatch) => {

    const responseData = await UserHandler.SignUp(nickname, username, password);
    console.log("UserAction:: sign up, res data: ", responseData);


    if (!isNull(responseData) && responseData.messages.indexOf('Success') !== -1) {

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

export const updateInfo = newInfo => async dispatch => {

    await UserHandler.UpdateInfo({ ...newInfo });
    dispatch(emitUpdateInfoAction({ ...newInfo }));
}