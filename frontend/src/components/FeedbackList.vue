<template>
  <div>
    <div v-for="feedback in feedbacks" :key="feedback._id" class="border p-4 my-2">
      <h3 class="text-xl">{{ feedback.name }}</h3>
      <p><strong>Email:</strong> {{ feedback.email }}</p>
      <p><strong>Type:</strong> {{ feedback.type }}</p>
      <p><strong>Message:</strong> {{ feedback.message }}</p>
      <p><em>{{ new Date(feedback.createdAt).toLocaleString() }}</em></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    feedbacks: {
      type: Array,
      required: true,
    },
  },
});
</script>
