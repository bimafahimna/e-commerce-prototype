/* eslint-disable camelcase */
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useProductStore = defineStore('product', () => {
  const product = ref([])
  const page = ref('')
  const totalPages = ref('')

  const getProducts = async () => {
    const res = await axios.get('https://gadgetout-products-server.vercel.app/product')

    product.value = res.data.products
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const getProductById = async (id) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/product/${id}`)

    return res.data
  }

  const getProductByPage = async (page) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/product?page=${page}`)

    product.value = res.data.products
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const postProduct = async (name, price, stock, discount, image_url, category_id) => {
    const res = await axios.post('https://gadgetout-products-server.vercel.app/product', {
      name, price, stock, discount, image_url, category_id
    })

    alert('Row added successfully')
    router.push('/admin/product')

    return res.data
  }

  const patchProduct = async (id, name, price, stock, discount, image_url, category_id) => {
    const res = await axios.patch(`https://gadgetout-products-server.vercel.app/product/${id}`, {
      name, price, stock, discount, image_url, category_id
    })

    alert('Row edited successfully')
    router.push('/admin/product')
    return res.data
  }

  const deleteProduct = async (id) => {
    await axios.delete(`https://gadgetout-products-server.vercel.app/product/${id}`)

    alert('Row deleted successfully')
    getProducts()
  }

  return { product, page, totalPages, getProducts, getProductById, getProductByPage, postProduct, patchProduct, deleteProduct }
})
