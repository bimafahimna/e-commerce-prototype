import { createRouter, createWebHistory } from 'vue-router'
import DashboardUser from '../views/user/DashboardUser.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'

const routes = [
    {
        path: '/',
        name: 'DashboardUser',
        component: DashboardUser
    },
    {
        path: '/admin',
        name: 'DashboardAdmin',
        component: DashboardAdmin
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })
  
  export default router