import { createRouter, createWebHistory } from 'vue-router';

const prefix: string = 'app';
const generateComponentName: string = (...names: string[]): string =>
    prefix.concat('.').concat(names.join('.'));

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: generateComponentName('panel'),
            path: '/panel',
            component: () => import('./layouts/panel.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: generateComponentName('panel', 'dashboard'),
                    component: () => import('./pages/dashboard/index.vue'),
                },
                {
                    path: 'profile',
                    name: generateComponentName('panel', 'profile'),
                    component: () => import('./pages/profile/index.vue'),
                },
            ],
        },
        {
            path: '/auth',
            name: generateComponentName('auth'),
            component: () => import('./layouts/auth.vue'),
            children: [
                {
                    name: generateComponentName('auth', 'login'),
                    path: 'login',
                    component: () => import('./pages/login/index.vue'),
                },
                // {
                //     name: generateComponentName('auth', 'forget'),
                //     path: 'forget',
                //     component: () => import('./pages/forget/index.vue'),
                // },
            ],
        },
    ],
});
