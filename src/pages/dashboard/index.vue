<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { fetchWorkersList } from '../../api/worker.ts';
import { fetchContainersList } from '../../api/container.ts';
import ContainersTable from './components/ContainersTable.vue';
import WorkersTable from './components/WorkersTable.vue';
import { createImage } from '../../api/image.ts';

const tools = reactive([
    {
        name: 'Prometheus',
        link: 'http://188.121.104.125:9090',
    },
    {
        name: 'Alert Manager',
        link: 'http://188.121.104.125:9093',
    },
    {
        name: 'Grafana',
        link: 'http://188.121.104.125:3000',
    },
    {
        name: 'Elastic Search',
        link: 'http://37.32.5.189:9200',
    },
    {
        name: 'Kibana',
        link: 'http://37.32.5.189:5601',
    },
]);

const workers = reactive({
    data: [],
    loading: false,
});

const containers = reactive({
    data: [],
    loading: false,
});

const getWorkers = async () => {
    try {
        workers.loading = true;
        workers.data = await fetchWorkersList();
    } finally {
        workers.loading = false;
    }
};

const getContainers = async () => {
    try {
        containers.loading = true;
        containers.data = await fetchContainersList();
    } finally {
        containers.loading = false;
    }
};

const addImageStatuses = reactive({
    loading: false,
});

const onAddImageButtonSubmit = async (e: Event) => {
    if (addImageStatuses.loading) return;
    const form = new FormData(e.target);

    const payload = (() => {
        const p = {};
        for (const item of [
            'name',
            'image-name',
            'port',
            'network',
            'environment',
        ]) {
            if (form.get(item)) {
                p[item] = form.get(item);
            }
        }
        return p;
    })();

    try {
        addImageStatuses.loading = true;
        await createImage(payload);
    } catch (e) {
        alert(e.message || e);
    } finally {
        addImageStatuses.loading = false;
    }
};

onMounted(() => {
    Promise.all([getWorkers(), getContainers()]);
});
</script>
<template>
    <div>
        <div class="text-slate-900 font-bold text-3xl mb-6">Dashboard</div>
        <div class="flex gap-4 mb-6">
            <div
                class="basis-1/2 border border-solid border-slate-300 rounded-xl p-4"
            >
                <div class="flex justify-between items-center mb-6">
                    <div class="text-slate-900 font-medium text-xl">
                        Containers
                    </div>
                    <div
                        class="bg-slate-900 size-8 text-white rounded-lg flex justify-center items-center"
                    >
                        <i class="fal fa-box" />
                    </div>
                </div>
                <ContainersTable />
            </div>
            <div
                class="basis-1/2 border border-solid border-slate-300 rounded-xl p-4"
            >
                <div class="flex justify-between items-center mb-6">
                    <div class="text-slate-900 font-medium text-xl">
                        Workers
                    </div>
                    <div
                        class="bg-slate-900 size-8 text-white rounded-lg flex justify-center items-center"
                    >
                        <i class="fal fa-user-helmet-safety" />
                    </div>
                </div>
                <WorkersTable />
            </div>
        </div>

        <div class="border border-slate-300 rounded-lg p-4 mb-6">
            <div class="text-slate-900 font-medium text-xl mb-6">Add Image</div>
            <form
                class="flex gap-4 flex-wrap"
                @submit.prevent="onAddImageButtonSubmit"
            >
                <input
                    placeholder="Image Name*"
                    required
                    class="rounded-lg border-slate-300"
                    name="image-name"
                />
                <input
                    placeholder="Name"
                    class="rounded-lg border-slate-300"
                    name="name"
                />
                <input
                    placeholder="Port"
                    class="rounded-lg border-slate-300"
                    name="port"
                />
                <input
                    placeholder="Network"
                    class="rounded-lg border-slate-300"
                    name="network"
                />
                <input
                    placeholder="Environments"
                    name="environment"
                    class="rounded-lg border-slate-300"
                />

                <button
                    :disabled="addImageStatuses.loading"
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 py-2 text-white rounded-lg px-4"
                >
                    <i
                        v-if="addImageStatuses.loading"
                        class="fas fa-spinner fa-spin"
                    />
                    <template v-else> Add </template>
                </button>
            </form>
        </div>
        <div class="border border-slate-300 rounded-lg p-4 mb-6 box-border">
            <div class="text-slate-900 font-medium text-xl mb-6">Tools</div>
            <div class="flex gap-4 w-full flex-wrap">
                <div v-for="(tool, index) in tools" :key="index" class="grow">
                    <a
                        class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 text-center block rounded-lg"
                        :href="tool.link"
                        target="_blank"
                        >{{ tool.name }}</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>
