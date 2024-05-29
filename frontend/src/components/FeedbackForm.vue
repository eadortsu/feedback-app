<template>
  <form @submit.prevent="submitFeedback" class="space-y-4">
    <div>
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" class="border p-2 w-full" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" class="border p-2 w-full" required />
    </div>
    <div>
      <label for="type">Feedback Type:</label>
      <select v-model="type" id="type" class="border p-2 w-full" required>
        <option value="Bug">Bug</option>
        <option value="Suggestion">Suggestion</option>
      </select>
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea v-model="message" id="message" class="border p-2 w-full" required></textarea>
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2">Submit Feedback</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const name = ref('');
    const email = ref('');
    const type = ref('');
    const message = ref('');

    const submitFeedback = async () => {
      try {
        await axios.post('/api/feedback', {
          name: name.value,
          email: email.value,
          type: type.value,
          message: message.value,
        });
        emit('submit');
        name.value = '';
        email.value = '';
        type.value = '';
        message.value = '';
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    };

    return {
      name,
      email,
      type,
      message,
      submitFeedback,
    };
  },
});
</script>

<style scoped>
form {
  max-width: 500px;
  margin: auto;
}
</style>
