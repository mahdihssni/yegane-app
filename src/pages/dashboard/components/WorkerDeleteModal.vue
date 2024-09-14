<script setup lang="ts">
import Modal from '../../../components/Modal.vue';
import { ref } from 'vue';
import { removeWorker } from '../../../api/worker.ts';

const props = defineProps({
    show: Boolean,
    id: String,
    title: String,
});

const loading = ref(false);

const onDeleteButtonClicked = async () => {
    try {
        loading.value = true;
        await removeWorker(props.id);
        emits('close');
    } finally {
        loading.value = false;
    }
};

const emits = defineEmits(['close']);
</script>

<template>
    <Modal :title="`Remove '${props.title}' worker`" :show="props.show">
        Are you sure want to remove the worker with IP: {{ props.title }}
        <div class="flex justify-end pt-4 mt-6 border-t border-slate-200 gap-2">
            <button
                class="shadow-lg bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                @click="emits('close')"
            >
                Cancel
            </button>
            <button
                class="shadow-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                @click="onDeleteButtonClicked"
            >
                <template v-if="loading">
                    <i class="fas fa-spin fa-spinner" />
                </template>
                <template v-else> Delete </template>
            </button>
        </div>
    </Modal>
</template>

<style scoped></style>
