import axios from 'axios';

const httpHandler = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const { post, put, delete: del } = httpHandler;
export default httpHandler;
