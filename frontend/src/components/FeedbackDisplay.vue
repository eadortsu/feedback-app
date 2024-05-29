<template>
  <div class="w-3/4 p-4 flex justify-center items-center h-full">
    <div v-if="selectedFeedback" class="text-left w-full max-w-md">
      <p class="text-xs text-gray-600 mb-2">{{ timeElapsed }}</p>
      <div class="flex items-center name">
        <FontAwesomeIcon :icon="selectedFeedback.type === 'Bug' ? 'exclamation-circle' : 'lightbulb'" :class="feedbackIcon" class="text-xl mr-4" />
        <h3 class="text-lg font-semibold">{{ selectedFeedback.name }}</h3>
      </div>
      <p class="text-sm text-gray-500">{{ selectedFeedback.email }}</p>
      <p class="mt-5">{{ selectedFeedback.message }}</p>
    </div>
    <div v-else class="text-center">
      <p class="text-sm text-gray-400">No feedback selected.</p>
    </div>
  </div>
</template>

<script  lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { PropType } from 'vue'
import { Feedback } from '../types/Feedback.ts'

library.add(faExclamationCircle, faLightbulb);
export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    selectedFeedback: {
      type: Object as PropType<Feedback | null>,
      default: null
    }
  },
  computed: {
    feedbackIcon() {
      return this.selectedFeedback?.type ==='Bug' ? 'text-red-500' : 'text-yellow-500';
    },
    timeElapsed() {
      if (!this.selectedFeedback) return '';
      const createdAt = new Date(this.selectedFeedback.createdAt);
      const now = new Date();
      const diffMs = now.getTime() - createdAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    }
  }
};
</script>

<style scoped>
.h-full {
  height: 100%;
}
.name{
  margin-left:  -45px;
}
</style>
