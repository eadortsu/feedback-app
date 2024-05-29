<template>
  <div class="sidebar w-1/3  flex flex-col">
    <!-- Filter and Sort Section -->
    <div class="p-4 border-b flex items-center justify-between">
      <div class="flex items-center space-x-2 filter">
        <label for="filter" class="mb-2">Filter</label>
        <select id="filter" v-model="filterType" @change="applyFilter" class="p-2 border rounded ">
          <option value="">All</option>
          <option value="Bug">Bug</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      </div>
      <div class="flex items-center space-x-2 filter">
        <label for="sort" class="mb-2">Sort</label>
        <select id="sort" v-model="sortOption" @change="applySort" class="p-2 border rounded">
          <option value="name">Name</option>
          <option value="createdAt">Date</option>
        </select>
      </div>
    </div>

    <!-- Feedback List -->
    <ul class="flex-1 overflow-y-auto p-4">
      <li
        v-for="feedback in feedbacks"
        :key="feedback._id"
        @click="() => selectFeedback(feedback)"
        class="cursor-pointer p-2 border-b feedback-card"
      >
        <FeedbackItem :feedback="feedback"/>
      </li>
    </ul>

    <!-- Pagination Section -->
    <div class="p-4 border-t">
      <div class="flex justify-between">
        <button
          class="px-2 py-1 btn-primary text-white rounded"
          @click="() => prevPage()"
          :disabled="currentPage === 1"
        >Prev</button>
        <span class="px-2 py-1 bg-blue-100 rounded">{{ currentPage }}/ {{totalPages}}</span>
        <button  :disabled="currentPage == totalPages" class="px-2 py-1 btn-primary text-white rounded" @click=" () => nextPage()">Next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Feedback } from '../types/Feedback';
import FeedbackItem from './FeedbackItem.vue';

export default defineComponent({
  components: {
    FeedbackItem,
  },
  props: {
    feedbacks: {
      type: Array as PropType<Feedback[]>,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
  },
  setup(_, { emit }) {
    const filterType = ref('');
    const sortOption = ref('createdAt');

    const applyFilter = () => {
      emit('filterFeedback', filterType.value);
    };
    const applySort = () => {
      emit('sortFeedback', sortOption.value);
    };
  const  selectFeedback = (feedback: Feedback) => {
      emit('selectFeedback', feedback);
    }

    const nextPage = ()=>{
    emit('nextPage')
    }
    const prevPage = ()=>{
      emit('prevPage')
    }

    return {
      filterType,
      sortOption,
      applyFilter,
      applySort,
      selectFeedback,
      nextPage,
      prevPage
    };
  }
});
</script>

<style scoped>
.sidebar{
  background: #F8FAFC;
  height: calc(100vh - 105px);
}
.filter select{
  width: 80px;
  height: 20px;
  border-radius: 3px 0px 0px 0px;
  background: #EAF0F6;
  font-size: 11px;
  padding: 0;
}

.filter label{
  width: 30px;
  height: 15px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: left;
  color: #64748B;
}

button:disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

</style>
