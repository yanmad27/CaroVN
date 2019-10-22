
import history from 'historyConfig';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const SignIn = async (username, password) => {
    try {
        const response = await instance.post('/user/login', { username, password });
        const { user } = response.data;
        console.log(user);
        if (user) {
            const { token } = response.data;
            window.localStorage.setItem('token', token);
            history.push('/game');
        }
    }
    catch (error) {
        console.error(error);
    }
    return false;
}

export const GetMe = async () => {

    try {
        const token = window.localStorage.getItem('token');
        const response = await instance.get('/me', { headers: { "Authorization": `Bearer ${token}` } });
        console.log(response);

    } catch (error) {
        console.error(error);
    }
}

export const SendPost = async (url) => {
    try {
        const response = await instance.post(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const SendGet = async url => {
    try {
        const response = await instance.get(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}