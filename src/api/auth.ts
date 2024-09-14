import { post, put } from './auth-http-handler.ts';

export const login = async (payload: {
    username: string;
    password: string;
}) => {
    try {
        const { data } = await post('auth/login', payload);
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const changePassword = async (payload: {
    oldPassword: string;
    newPassword: string;
}) => {
    try {
        const { data } = await put('auth/change-password', payload);
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};
