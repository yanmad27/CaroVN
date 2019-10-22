import ActionTypes from './actionTypes';



export const emitSignInAction = () => {
    console.log("UserAction:: sign in is triggered...");
    return {
        type: ActionTypes.SIGN_IN,
        payload: true,
    }
}

export const signIn = () => async (dispatch) => {
    console.log("UserAction:: sign in is triggered...");
    dispatch(emitSignInAction());
}