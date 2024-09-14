<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { fetchContainersList } from '../../../api/container.ts';
import ContainerDetails from './ContainerDetails.vue';
import ContainerDeleteModal from './ContainerDeleteModal.vue';

const containers = reactive({
    data: [],
    loading: false,
    selected: {
        id: '',
        title: '',
    },
    removeWorkerModalShown: false,
    workerDetailsModalShown: false,
});

const onShowDetailsModal = (worker: string) => {
    containers.selected.id = worker.split(':')[2];
    containers.selected.title = worker.split(':')[1];
    containers.workerDetailsModalShown = true;
};

const onShowRemoveModal = (worker: string) => {
    containers.selected.id = worker.split(':')[2];
    containers.selected.title = worker.split(':')[1];
    containers.removeWorkerModalShown = true;
};

const onCloseDetailsModal = () => {
    containers.selected.id = '';
    containers.selected.title = '';
    containers.workerDetailsModalShown = false;
};

const onCloseRemoveModal = () => {
    containers.selected.id = '';
    containers.selected.title = '';
    containers.removeWorkerModalShown = false;
};

const getContainers = async () => {
    try {
        containers.loading = true;
        containers.data = await fetchContainersList();
    } finally {
        containers.loading = false;
    }
};

onMounted(() => {
    getContainers();
});
</script>

<template>
    <div>
        <div
            v-if="containers.loading"
            class="w-full flex justify-center items-center flex-col gap-2 animate-pulse"
        >
            <i class="fa fa-spinner-third text-xl fa-spin fa-arrows-spin"></i>
            <span class="font-medium text-slate-500">Loading Data</span>
        </div>
        <div
            v-else-if="!containers.data.length"
            class="border border-solid border-slate-300 rounded-lg p-4 flex justify-center items-center gap-2"
        >
            <i class="fal fa-hexagon-exclamation text-blue-500 text-3xl" />
            There is no data!
        </div>
        <div v-else class="w-full">
            <div class="flex w-full px-4 mb-1">
                <div class="basis-4/12 text-slate-700 text-sm">Image Name</div>
                <div class="basis-4/12 text-slate-700 text-sm">Name</div>
            </div>
            <div class="flex flex-col gap-2">
                <div
                    class="flex border border-solid border-slate-300 rounded-lg p-4 gap-4 items-center"
                    v-for="container in containers.data"
                    :key="container"
                >
                    <div class="basis-4/12 text-sm">
                        {{ container.split(':')[1] }}
                    </div>
                    <div class="basis-4/12 text-sm">
                        {{ container.split(':')[3] }}
                    </div>
                    <div class="basis-4/12 flex justify-end gap-2">
                        <button
                            class="bg-red-100 hover:bg-red-200 rounded-lg text-red-500 size-7"
                            @click="onShowRemoveModal(container)"
                        >
                            <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                        <button
                            class="bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-500 size-7"
                            @click="onShowDetailsModal(container)"
                        >
                            <i class="fas fa-angle-right text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <ContainerDetails
            :show="containers.workerDetailsModalShown"
            :title="containers.selected.title"
            :id="containers.selected.id"
            @close="onCloseDetailsModal"
        />
        <ContainerDeleteModal
            :show="containers.removeWorkerModalShown"
            :title="containers.selected.title"
            :id="containers.selected.id"
            @close="onCloseRemoveModal"
        />
    </div>
</template>

<style scoped></style>
