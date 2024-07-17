import { createRouter, createWebHistory } from 'vue-router';
import AuthorView from '@/views/AuthorView.vue';
import CategoryView from '@/views/CategoriesView.vue';

const routes = [
  {
    path: '/',
    name: 'author',
    component: AuthorView
  },
  {
    path: '/categories',
    name: 'category',
    component: CategoryView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;