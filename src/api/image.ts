import { post } from './http-handler.ts';

export const createImage = async (payload: {
    'image-name': string;
    name: string;
    port: string;
    network: string;
    environment: string;
}) => {
    try {
        await post('/deploy_image', payload);
    } catch (e) {
        return Promise.reject(e);
    }
};
