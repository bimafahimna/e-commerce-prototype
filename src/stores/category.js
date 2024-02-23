import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useCategoryStore = defineStore('category', () => {
  const category = ref([])
  const page = ref('')
  const totalPages = ref('')

  const getCategories = async () => {
    const res = await axios.get('https://gadgetout-products-server.vercel.app/category')

    category.value = res.data.categories
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const getCategoryById = async (id) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/category/${id}`)

    return res.data.category
  }

  const getCategoryByPage = async (page) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/category?page=${page}`)
    category.value = res.data.categories
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const postCategories = async (name) => {
    const res = await axios.post('https://gadgetout-products-server.vercel.app/category', {
      name
    })

    alert('Row added successfully')
    router.push('/admin/category')

    return res.data
  }

  const patchCategory = async (id, name) => {
    const res = await axios.patch(`https://gadgetout-products-server.vercel.app/category/${id}`, {
      name
    })

    alert('Row edited successfully')
    router.push('/admin/category')
    return res.data
  }

  const deleteCategory = async (id) => {
    await axios.delete(`https://gadgetout-products-server.vercel.app/category/${id}`)

    alert('Row deleted successfully')
    getCategories()
  }

  return { category, page, totalPages, getCategories, getCategoryById, getCategoryByPage, postCategories, patchCategory, deleteCategory }
})
