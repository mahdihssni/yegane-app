<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { fetchWorkersList } from '../../../api/worker.ts';
import WorkerDetails from './WorkerDetails.vue';
import LoadingStatus from '../../../components/LoadingStatus.vue';
import WorkerDeleteModal from './WorkerDeleteModal.vue';

const workers = reactive({
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
    workers.selected.id = worker.split(':')[1];
    workers.selected.title = worker.split(':')[2];
    workers.workerDetailsModalShown = true;
};

const onShowRemoveModal = (worker: string) => {
    workers.selected.id = worker.split(':')[1];
    workers.selected.title = worker.split(':')[2];
    workers.removeWorkerModalShown = true;
};

const onCloseDetailsModal = () => {
    workers.selected.id = '';
    workers.selected.title = '';
    workers.workerDetailsModalShown = false;
};

const onCloseRemoveModal = () => {
    workers.selected.id = '';
    workers.selected.title = '';
    workers.removeWorkerModalShown = false;
};

const getWorkers = async () => {
    try {
        workers.loading = true;
        workers.data = await fetchWorkersList();
    } finally {
        workers.loading = false;
    }
};

onMounted(() => {
    getWorkers();
});
</script>

<template>
    <div>
        <LoadingStatus v-if="workers.loading" />
        <div
            v-else-if="!workers.data.length"
            class="border border-solid border-slate-300 rounded-lg p-4 flex justify-center items-center gap-2"
        >
            <i class="fal fa-hexagon-exclamation text-blue-500 text-3xl" />
            There is no data!
        </div>
        <div v-else class="w-full">
            <div class="flex w-full px-4 mb-1">
                <div class="basis-6/12 text-slate-700 text-sm">IP</div>
            </div>
            <div class="flex flex-col gap-2">
                <div
                    class="flex border border-solid border-slate-300 rounded-lg p-4 gap-4 items-center"
                    v-for="worker in workers.data"
                    :key="worker"
                >
                    <div class="basis-6/12 text-sm">
                        {{ worker.split(':')[2] }}
                    </div>
                    <div class="basis-6/12 flex justify-end gap-2">
                        <button
                            class="bg-red-100 hover:bg-red-200 rounded-lg text-red-500 size-7"
                            @click="onShowRemoveModal(worker)"
                        >
                            <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                        <button
                            class="bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-500 size-7"
                            @click="onShowDetailsModal(worker)"
                        >
                            <i class="fas fa-angle-right text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <WorkerDetails
            :show="workers.workerDetailsModalShown"
            :title="workers.selected.title"
            :id="workers.selected.id"
            @close="onCloseDetailsModal"
        />
        <WorkerDeleteModal
            :show="workers.removeWorkerModalShown"
            :title="workers.selected.title"
            :id="workers.selected.id"
            @close="onCloseRemoveModal"
        />
    </div>
</template>

<style scoped></style>
