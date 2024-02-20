import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../App.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })
  
  export default router