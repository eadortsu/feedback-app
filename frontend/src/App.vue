<template>
  <div class="container mx-auto p-4">
    <feedback-form @submit="fetchFeedbacks"></feedback-form>
    <feedback-list :feedbacks="feedbacks"></feedback-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FeedbackForm from './components/FeedbackForm.vue';
import FeedbackList from './components/FeedbackList.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    FeedbackForm,
    FeedbackList,
  },
  setup() {
    const feedbacks = ref([]);

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedback');
        feedbacks.value = response.data.results;
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();

    return {
      feedbacks,
      fetchFeedbacks,
    };
  },
});
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
