<script setup lang="ts">
import { ref } from 'vue';
import { changePassword } from '../../api/auth.ts';

const loading = ref(false);

const onSubmitChangePassword = async (e: Event) => {
    if (loading.value) return;
    const form = new FormData(e.target);

    try {
        loading.value = true;
        await changePassword({
            oldPassword: form.get('oldPassword'),
            newPassword: form.get('newPassword'),
        });
        alert('Your password updated successfully!');
    } catch (e) {
        alert(e.message || e);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex gap-4 flex-wrap">
        <div class="border border-slate-300 rounded-lg p-4 w-full">
            <div class="text-slate-900 font-medium text-xl mb-6">
                Change Password
            </div>
            <form
                class="flex gap-4 flex-wrap"
                @submit.prevent="onSubmitChangePassword"
            >
                <input
                    placeholder="Old Password"
                    required
                    class="rounded-lg border-slate-300"
                    name="oldPassword"
                />
                <input
                    placeholder="New Password"
                    class="rounded-lg border-slate-300"
                    name="newPassword"
                    required
                />

                <button
                    :disabled="loading"
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 py-2 text-white rounded-lg px-4"
                >
                    <i v-if="loading" class="fas fa-spinner fa-spin" />
                    <template v-else> Update </template>
                </button>
            </form>
        </div>
    </div>
</template>
