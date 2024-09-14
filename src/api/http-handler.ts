import axios from 'axios';

const httpHandler = axios.create({
    baseURL: 'http://37.32.5.244:18080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const { get, post, delete: del } = httpHandler;
export default httpHandler;
