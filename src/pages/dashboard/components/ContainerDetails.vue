<script setup lang="ts">
import Modal from '../../../components/Modal.vue';
import { reactive, watch } from 'vue';
import LoadingStatus from '../../../components/LoadingStatus.vue';
import { fetchContainer } from '../../../api/container.ts';

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
        details.data = await fetchContainer(props.id);
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
                    <div class="text-sm text-slate-700 mb-1">Image Name</div>
                    <div
                        class="text-lg text-slate-900"
                        v-text="`${details.data['image_name']}`"
                    />
                </div>
                <div class="basis-1/2">
                    <div class="text-sm text-slate-700 mb-1">Name</div>
                    <div
                        class="text-lg text-slate-900"
                        v-text="`${details.data['name']}`"
                    />
                </div>
            </div>
            <div class="flex">
                <div class="basis-1/2">
                    <div class="text-sm text-slate-700 mb-1">Worker IP</div>
                    <div
                        class="text-lg text-slate-900"
                        v-text="`${details.data['worker_ip']}`"
                    />
                </div>
                <div class="basis-1/2">
                    <div class="text-sm text-slate-700 mb-1">Status</div>
                    <span
                        v-text="details.data['status']"
                        class="bg-gray-100 text-base text-gray-500 px-2 py-1 rounded"
                    />
                </div>
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
