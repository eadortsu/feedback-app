<template>
  <div class="container mx-auto p-4">
    <feedback-form></feedback-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FeedbackForm from '../components/FeedbackForm.vue';

export default defineComponent({
  components: {
    FeedbackForm,
  },
});
</script>

<style scoped>

</style>
