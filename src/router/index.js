import { createRouter, createWebHistory } from 'vue-router'
import DashboardUser from '../views/user/DashboardUser.vue'
import ChangePassword from '../views/user/ChangePassword.vue'
import ProfileUser from '../views/user/ProfileUser.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'
import TableProduct from '../views/admin/product/TableProduct.vue'
import TableCategory from '../views/admin/category/TableCategory.vue'
import PaymentAdmin from '../views/admin/PaymentAdmin.vue'
import AddCategory from '../views/admin/category/AddCategory.vue'
import AddProduct from '../views/admin/product/AddProduct.vue'
import Login from '../views/auth/Login.vue'
import TableCart from '../views/user/cart/TableCart.vue'
import Register from '../views/auth/Register.vue'
import Catalog from '../views/user/CatalogUser.vue'

import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'DashboardUser',
    component: DashboardUser
  },
  {
    path: '/profile',
    name: 'ProfileUser',
    component: ProfileUser
  },
  {
    path: '/profile/change-password',
    name: 'ChangePassword',
    component: ChangePassword
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
    path: '/admin/add-product',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/admin/edit-product/:id',
    name: 'EditProduct',
    component: AddProduct,
    props: true
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
    component: AddCategory,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin/payment',
    name: 'Payment',
    component: PaymentAdmin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: TableCart
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const userLoggedIn = store.$state.user
  const isAdmin = userLoggedIn && userLoggedIn.role === 'ADMIN'

  const isGoToAdminPage = to.path.includes('/admin')
  const isGoToProfileOrCart = to.path.includes('/profile') || to.path.includes('/cart')
  const isGoToAuth = to.name === 'Login' || to.name === 'Register'

  if (userLoggedIn && isGoToAuth) {
    return isAdmin ? next({ name: 'Dashboard' }) : next({ name: 'DashboardUser' })
  }

  if (!isAdmin && isGoToAdminPage) {
    return next({ name: 'DashboardUser' })
  }

  if (isAdmin && !isGoToAdminPage) {
    return next({ name: 'Dashboard' })
  }

  if (!userLoggedIn && isGoToProfileOrCart) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
