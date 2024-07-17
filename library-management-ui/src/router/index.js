import { createRouter, createWebHistory } from 'vue-router';
import AuthorView from '@/views/AuthorView.vue';
import CategoryView from '@/views/CategoriesView.vue';
import BooksView from "@/views/BooksView.vue"
import LoanView from "@/views/LoanView.vue"
import PublishersView from '@/views/PublishersView.vue'

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
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView
  },
  {
    path: '/loans',
    name: 'loans',
    component: LoanView
  },
  {
    path: '/publishers',
    name: 'publishers',
    component: PublishersView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;