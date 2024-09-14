<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'universal-cookie';

const router = useRouter();
const cookies = new Cookies();

onMounted(() => {
    if (cookies.get('auth')) {
        router.replace({
            name: 'app.panel.dashboard',
        });
    }
});
</script>

<template>
    <div class="flex h-lvh bg-white">
        <div class="basis-1/2 h-full flex justify-center items-center">
            <RouterView />
        </div>
        <div
            class="overflow-hidden relative basis-1/2 m-8 p-6 bg-blue-500 rounded-3xl bg-[url('/images/login.jpg')] bg-cover bg-center flex flex-col px-24 justify-center items-center"
        >
            <div class="w-full h-full absolute z-0 bg-black/50 inset-0"></div>
            <div class="relative z-10">
                <div class="text-white text-5xl font-bold mb-4">
                    Orchestrify
                </div>
                <div class="text-white/90 text-center">
                    An Orchestrify system is a powerful tool that automates and
                    streamlines complex workflows by coordinating multiple
                    tasks, processes, and systems seamlessly. It acts as a
                    central hub where different software applications,
                    databases, and services can interact and exchange data
                    efficiently, optimizing productivity and reducing manual
                    effort. By orchestrating these elements, it ensures smooth
                    operations, enhances scalability, and improves overall
                    business agility, making it an invaluable asset for modern
                    organizations looking to enhance their efficiency and
                    competitiveness.
                </div>
            </div>
        </div>
    </div>
</template>
