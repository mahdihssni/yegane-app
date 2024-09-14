<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { login } from '../../api/auth.ts';
import Cookies from 'universal-cookie';

const router = useRouter();

const loading = ref(false);
const error = ref(false);

const cookies = new Cookies();

const onSubmitLogin: void = async (e: Event) => {
    const form = new FormData(e.target);
    console.log(form.get('username'));

    const payload = {
        username: form.get('username'),
        password: form.get('password'),
    };

    try {
        loading.value = true;
        error.value = false;
        const { access_token } = await login(payload);

        cookies.set('auth', access_token, { secure: true });

        await router.replace({
            name: 'app.panel.dashboard',
        });
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (cookies.get('auth')) {
        router.replace({
            name: 'app.panel.dashboard',
        });
    }
});
</script>

<template>
    <div>
        <div class="text-2xl font-bold mb-2 text-slate-800">
            <i
                class="text-xl fa-light fa-right-to-bracket bg-slate-800 rounded-xl text-white p-2 me-2"
            />
            Log in
        </div>
        <div class="text-sm font-light text-slate-600 mb-6">
            Enter your username and password to login.
        </div>
        <div
            class="mb-4 bg-red-100 text-red-500 px-4 py-2 rounded-lg text-sm"
            v-if="error"
        >
            <i class="fas fa-warning" />
            Incorrect username or password! try again
        </div>
        <form class="flex flex-col" @submit.prevent="onSubmitLogin">
            <span
                class="flex items-center w-full bg-slate-100 rounded-xl px-4 mb-2 gap-2"
            >
                <i class="fa-light fa-user flex items-center justify-center" />
                <input
                    placeholder="Username"
                    name="username"
                    class="grow bg-transparent placeholder:text-sm text-slate-700 border-none outline-none focus:ring-0"
                />
            </span>
            <span
                class="flex items-center w-full bg-slate-100 rounded-xl px-4 mb-2 gap-2"
            >
                <i class="fa-light fa-lock flex items-center justify-center" />
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    class="bg-transparent placeholder:text-sm text-slate-700 border-none outline-none focus:ring-0"
                />
            </span>
            <!--            <RouterLink-->
            <!--                :to="{ name: 'app.auth.forget' }"-->
            <!--                class="self-end text-sm text-blue-500 hover:text-blue-600 mb-6"-->
            <!--            >-->
            <!--                Forget Password?-->
            <!--            </RouterLink>-->
            <button
                :disabled="loading"
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2"
            >
                <i v-if="loading" class="fas fa-spinner fa-spin" />
                <template v-else> Login </template>
            </button>
        </form>
    </div>
</template>
