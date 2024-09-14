<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'universal-cookie';

const router = useRouter();
const cookies = new Cookies();

onMounted(() => {
    if (!cookies.get('auth')) {
        router.replace({
            name: 'app.auth.login',
        });
    }
});

const onGotoDashboard = () => {
    router.push({
        name: 'app.panel.dashboard',
    });
};

const onGotoProfile = () => {
    router.push({
        name: 'app.panel.profile',
    });
};

const onSignOut = async () => {
    cookies.remove('auth');
    await router.replace({
        name: 'app.auth.login',
    });
};
</script>

<template>
    <div class="flex flex-col bg-white m-8 shadow-lg rounded-3xl p-6">
        <div
            class="bg-blue-500 w-full rounded-2xl p-4 flex justify-between items-center mb-8 shadow-lg backdrop-blur"
        >
            <div>
                <div class="text-white font-medium">Admin</div>
                <div class="text-white/75 font-light text-xs">Welcome Back</div>
            </div>
            <div class="flex gap-3">
                <button
                    class="text-white bg-blue-800 hover:bg-blue-900 size-8 rounded-lg"
                    @click="onGotoDashboard"
                >
                    <i class="far fa-home" />
                </button>
                <button
                    class="text-white bg-blue-800 hover:bg-blue-900 size-8 rounded-lg"
                    @click="onGotoProfile"
                >
                    <i class="far fa-cog" />
                </button>
                <button
                    class="text-white bg-blue-800 hover:bg-blue-900 size-8 rounded-lg"
                    @click="onSignOut"
                >
                    <i class="far fa-sign-out" />
                </button>
            </div>
        </div>

        <RouterView />
    </div>
</template>

<style scoped></style>
