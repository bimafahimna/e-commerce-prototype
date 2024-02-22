import { createRouter, createWebHistory } from 'vue-router'
import DashboardUser from '../views/user/DashboardUser.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'
import TableProduct from '../views/admin/product/TableProduct.vue'
import TableCategory from '../views/admin/category/TableCategory.vue'
import PaymentAdmin from '../views/admin/PaymentAdmin.vue'
import AddCategory from '../views/admin/category/AddCategory.vue'
import Login from '../views/auth/Login.vue'
import TableCart from "../views/user/cart/TableCart.vue";

const routes = [
  {
    path: '/',
    name: 'DashboardUser',
    component: DashboardUser
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: DashboardAdmin
  },
  {
    path: '/admin/product',
    name: 'Product',
    component: TableProduct
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: TableCategory
  },
  {
    path: '/admin/add-category',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/admin/edit-category/:id',
    name: 'EditCategory',
    component: AddCategory
  },
  {
    path: '/admin/payment',
    name: 'Payment',
    component: PaymentAdmin
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/cart",
    name: "Cart",
    component: TableCart,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
