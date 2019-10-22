import history from 'historyConfig';
import * as UserHandler from 'reduxs/handlers/UserHandler';
import { isNull } from 'util';
import ActionTypes from './actionTypes';


export const emitSignInAction = () => {
    console.log("UserAction:: sign in is triggered...");
    return {
        type: ActionTypes.SIGN_IN,
        payload: true,
    }
}

export const SignIn = (username, password) => async (dispatch) => {

    console.log("UserAction:: sign in is triggered...");
    const responseData = await UserHandler.SignIn(username, password);
    if (!isNull(responseData)) {

        const { token } = responseData;
        window.localStorage.setItem('token', token);
        dispatch(emitSignInAction());
        history.push('/game');
    }
}