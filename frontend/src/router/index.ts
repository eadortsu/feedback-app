import { createRouter, createWebHistory } from 'vue-router';
import FeedbackListPage from '../pages/FeedbackListPage.vue';
import AddFeedbackPage from '../pages/AddFeedbackPage.vue';

const routes = [
  { path: '/', component: FeedbackListPage },
  { path: '/add', component: AddFeedbackPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
