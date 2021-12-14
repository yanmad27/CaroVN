
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8013',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const SignIn = async (username, password) => {
    try {
        const response = await instance.post('/user/login', { username, password });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
    return null;
}

export const SignUp = async (nickname, username, password) => {
    try {
        const response = await instance.post('/user/register', { nickname, username, password });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
    return null;
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

export const SendPost = async (url, formData) => {
    try {
        const response = await instance.post(url, { ...formData });
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