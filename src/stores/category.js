import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useCategoryStore = defineStore('category', () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const category = ref([])
  const categoryProduct = ref([])
  const itemCategoryProduct = ref([])
  const page = ref('')
  const totalPages = ref('')

  const getCategories = async () => {
    const res = await axios.get('https://gadgetout-products-server.vercel.app/category')

    category.value = res.data.categories
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const getCategoryById = async (id, pageNumber) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/category/${id}?page=${pageNumber}&pageSize=8`)

    categoryProduct.value = res.data.category
    itemCategoryProduct.value = res.data.category.Products
    page.value = res.data.category.page
    totalPages.value = res.data.category.totalPages
  }

  const getCategoryByPage = async (pageNumber) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/category?page=${pageNumber}`)
    category.value = res.data.category
  }

  const postCategories = async (name) => {
    const res = await axios.post('https://gadgetout-products-server.vercel.app/category', { name },
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })

    alert('Row added successfully')
    router.push('/admin/category')

    return res.data
  }

  const patchCategory = async (id, name) => {
    const res = await axios.patch(`https://gadgetout-products-server.vercel.app/category/${id}`, { name },
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })

    alert('Row edited successfully')
    router.push('/admin/category')
    return res.data
  }

  const deleteCategory = async (id) => {
    await axios.delete(`https://gadgetout-products-server.vercel.app/category/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })

    alert('Row deleted successfully')
    getCategories()
  }

  return { category, categoryProduct, itemCategoryProduct, page, totalPages, getCategories, getCategoryById, getCategoryByPage, postCategories, patchCategory, deleteCategory }
})
