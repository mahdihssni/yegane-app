<script setup lang="ts">
import Modal from '../../../components/Modal.vue';
import { reactive, watch } from 'vue';
import { fetchWorker } from '../../../api/worker.ts';
import LoadingStatus from '../../../components/LoadingStatus.vue';

const props = defineProps({
    id: String,
    show: Boolean,
});
const emits = defineEmits(['close']);

const details = reactive({
    loading: true,
    data: {},
    isFailureConnection: false,
});

const getWorker = async () => {
    try {
        details.isFailureConnection = false;
        details.loading = true;
        details.data = await fetchWorker(props.id);
    } catch (ex) {
        details.isFailureConnection = true;
    } finally {
        details.loading = false;
    }
};

watch(
    () => props.show,
    (value) => {
        if (!value) return;
        getWorker(props.id);
    },
);
</script>

<template>
    <Modal :show="props.show" @close="emits('close')">
        <LoadingStatus v-if="details.loading" />
        <template v-else>
            <div class="flex">
                <div class="basis-1/2 mb-4">
                    <div class="text-sm text-slate-700 mb-1">CPU Usage</div>
                    <div
                        class="text-lg text-slate-900"
                        v-text="`${details.data['cpu-usage']}%`"
                    />
                </div>
                <div class="basis-1/2">
                    <div class="text-sm text-slate-700 mb-1">RAM Usage</div>
                    <div
                        class="text-lg text-slate-900"
                        v-text="`${details.data['ram-usage']}%`"
                    />
                </div>
            </div>
            <div class="basis-1/2">
                <div class="text-sm text-slate-700 mb-1">Status</div>
                <span
                    v-text="details.data['status']"
                    class="bg-green-100 text-base text-green-500 px-2 py-1 rounded"
                />
            </div>
        </template>
        <div class="flex justify-end pt-4 mt-6 border-t border-slate-200">
            <button
                class="shadow-lg bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                @click="emits('close')"
            >
                Cancel
            </button>
        </div>
    </Modal>
</template>

<style scoped></style>
