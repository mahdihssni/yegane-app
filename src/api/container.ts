import { del, get } from './http-handler.ts';

export const fetchContainersList = async () => {
    try {
        const { data } = await get('/containers');
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const fetchContainer = async (id: string) => {
    try {
        const { data } = await get(`/container/${id}`);
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const removeContainer = async (id: string) => {
    try {
        await del(`/del/container/${id}`);
    } catch (e) {
        return Promise.reject(e);
    }
};
