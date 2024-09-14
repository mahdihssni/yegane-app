<script setup lang="ts"></script>

<template>
    <div>
        <div class="text-2xl font-bold mb-2 text-slate-800">
            <i
                class="text-xl fa-light fa-unlock bg-slate-800 rounded-xl text-white p-2 me-2"
            />
            Reset Password
        </div>
        <div class="text-sm font-light text-slate-600 mb-6">
            Enter your username to send you a verification email.
        </div>
        <form class="flex flex-col">
            <span
                class="flex items-center w-full bg-slate-100 rounded-xl px-4 mb-2 gap-2"
            >
                <i class="fa-light fa-user flex items-center justify-center" />
                <input
                    placeholder="Username"
                    class="grow bg-transparent placeholder:text-sm text-slate-700 border-none outline-none focus:ring-0"
                />
            </span>
            <RouterLink
                :to="{ name: 'app.auth.forget' }"
                class="self-end text-sm text-blue-500 hover:text-blue-600 mb-6"
            >
                I remember my password!
            </RouterLink>
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-2"
            >
                Reset
            </button>
        </form>
    </div>
</template>

<style scoped></style>
