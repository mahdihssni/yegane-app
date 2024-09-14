import { get, del } from './http-handler.ts';

export const fetchWorkersList = async () => {
    try {
        const { data } = await get('/workers');
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const fetchWorker = async (id: string) => {
    try {
        const { data } = await get(`/worker/${id}`);
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const removeWorker = async (id: string) => {
    try {
        await del(`/del/worker/${id}`);
    } catch (e) {
        return Promise.reject(e);
    }
};
