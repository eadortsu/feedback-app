<template>
  <div class="flex items-center p-4 cursor-pointer" @click="$emit('selectFeedback', feedback)">
    <FontAwesomeIcon :icon="feedback.type === 'Bug' ? 'exclamation-circle' : 'lightbulb'" :class="feedbackIcon" class="text-xl mr-4" />
    <div class="flex-1">
      <h3 class="font-semibold">{{ feedback.name }}</h3>
      <p class="text-sm text-gray-600">{{ feedback.type }}</p>
    </div>
    <div class="text-sm text-gray-500">
      <p class="text-xs text-gray-500">{{ elapsedTime }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Feedback } from '../types/Feedback';

library.add(faExclamationCircle, faLightbulb);

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    feedback: {
      type: Object as PropType<Feedback>,
      required: true,
    },
  },
  methods: {

  },
  computed: {
    feedbackIcon() {
      return this.feedback.type ==='Bug' ? 'text-red-500' : 'text-yellow-500';
    },
    elapsedTime() {
      const createdAt = new Date(this.feedback.createdAt);
      const now = new Date();
      const diff = now.getTime() - createdAt.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
      } else {
        return  'Just now';
      }
    }
  },
});
</script>

<style scoped>
/* Add Tailwind CSS styles here */
</style>
