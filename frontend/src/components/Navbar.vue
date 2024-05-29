<template>
  <nav class="p-4 flex justify-between items-center">
    <!-- Left icon -->
    <div>
      <!-- Replace with your left icon -->
     <img src="/logo.png" alt="Logo" class="logo">
    </div>
    <!-- Right buttons -->
    <div>
      <router-link to="/" class="px-4 py-2 btn-secondary  rounded mr-4">All Feedback</router-link>
      <router-link to="/add" class="px-4 py-2 btn-primary text-white rounded">New Feedback</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
});
</script>

<style scoped>
.logo{
  width:  70px;
}

nav{
   background: #F8FAFC;
}
</style>
