<!-- src/pages/FeedbackListPage.vue -->
<template>
  <div class="flex">
    <Sidebar
      :feedbacks="feedbacks"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @prevPage="prevPage"
      @nextPage="nextPage"
      @selectFeedback="selectFeedback"
      @filter-feedback="filterFeedback"
      @sort-feedback="sortFeedback"
    />
    <FeedbackDisplay :selectedFeedback="selectedFeedback" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import FeedbackDisplay from '../components/FeedbackDisplay.vue';
import axios from 'axios';
import { Feedback } from '../types/Feedback';
const { VITE_API_URL } = import.meta.env;

interface FetchOptions {
  page?: number;
  limit?: number;
  type?: string;
  sortBy?: string;
  order?: string;
}

export default defineComponent({
  components: {
    Sidebar,
    FeedbackDisplay,
  },
  setup() {
    const feedbacks = ref<Feedback[]>([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const selectedFeedback = ref<Feedback | null>(null);
    const filterType = ref('');
    const sortOption = ref('createdAt');

    const fetchFeedbacks = async ({ page = currentPage.value, limit = 10, type = filterType.value, sortBy = sortOption.value, order = 'desc' }: FetchOptions = {}) => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/feedback?page=${page}&limit=${limit}&type=${type}&sortBy=${sortBy}&order=${order}`);
        feedbacks.value = response.data.results;
        currentPage.value = page;
        totalPages.value = response.data.totalPages
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchFeedbacks();
      }
    };

    const nextPage = () => {
     if(currentPage.value < totalPages.value) {
       currentPage.value++;
       fetchFeedbacks();
     }
    };

    const selectFeedback = (feedback: Feedback) => {
      selectedFeedback.value = feedback;
    };

    const filterFeedback = async (type: string) => {
      filterType.value = type;
      await fetchFeedbacks();
    };

    const sortFeedback = async (sortBy: string) => {
      sortOption.value = sortBy;
      await fetchFeedbacks({order :  sortBy === 'createdAt'? 'desc': 'asc'});
    };

    onMounted(() => {
      fetchFeedbacks();
    });

    return {
      totalPages,
      feedbacks,
      currentPage,
      prevPage,
      nextPage,
      selectedFeedback,
      selectFeedback,
      filterFeedback,
      sortFeedback,
    };
  },
});
</script>



<style scoped>

</style>
