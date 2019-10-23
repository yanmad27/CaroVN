import * as HttpClient from 'services/HttpClient';


export const SignIn = async (username, password) => {
    const rs = await HttpClient.SignIn(username, password);
    console.log(rs);
    return rs;

}

export const SignUp = async (username, password) => {
    const rs = await HttpClient.SignUp(username, password);
    console.log(rs);
    return rs;

}

export const SignOut = () => {

}