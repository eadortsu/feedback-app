<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold mb-4">Add New Feedback</h2>
    <form @submit.prevent="submitFeedback" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="name" type="text" id="name" class="mt-1 border p-2 w-full rounded" required />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" class="mt-1 border p-2 w-full rounded" required />
      </div>
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Feedback Type</label>
        <select v-model="type" id="type" class="mt-1 border p-2 w-full rounded" required>
          <option value="Bug">Bug</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea v-model="message" id="message" class="mt-1 border p-2 w-full rounded" required></textarea>
      </div>
      <div class="flex justify-end space-x-4">
        <button type="button" @click="discardFeedback" class="btn-secondary  p-2 rounded">Discard</button>
        <button type="submit" class="btn-primary text-white p-2 rounded">Send Feedback</button>
      </div>
      <div v-if="error" class="text-red-500">{{ error }}</div> <!-- Error message -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const { VITE_API_URL } = import.meta.env;

export default defineComponent({
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const type = ref('');
    const message = ref('');
    const error = ref<string | null>(null);

    const submitFeedback = async () => {
      axios
        .post(`${VITE_API_URL}/api/feedback`, {
          name: name.value,
          email: email.value,
          type: type.value,
          message: message.value,
        })
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            error.value = err.response.data.error;
          } else {
            error.value = 'Failed to submit feedback. Please try again later.';
          }
          console.error('Error submitting feedback:', err);
        });
    };

    const discardFeedback = () => {
      name.value = '';
      email.value = '';
      type.value = '';
      message.value = '';
    };

    return {
      name,
      email,
      type,
      message,
      submitFeedback,
      discardFeedback,
      error
    };
  },
});
</script>

<style scoped>
/* Add Tailwind CSS styles here if necessary */
</style>
