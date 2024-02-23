/* eslint-disable camelcase */
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useProductStore = defineStore('product', () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const product = ref([])
  const page = ref('')
  const totalPages = ref('')
  const limitedStock = ref([])

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

  const getProductByPage = async (pageNumber) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/product?page=${pageNumber}&pageSize=5`)

    product.value = res.data.products
    page.value = res.data.page
    totalPages.value = res.data.totalPages
  }

  const searchProduct = async (query) => {
    const res = await axios.get(`https://gadgetout-products-server.vercel.app/product?search=${query}`)

    product.value = res.data.products
  }

  const getLimitedStock = async () => {
    const res = await axios.get('https://gadgetout-products-server.vercel.app/product?sort=stock')

    limitedStock.value = res.data.products
  }

  const postProduct = async (name, price, stock, discount, image_url, category_id) => {
    const res = await axios.post('https://gadgetout-products-server.vercel.app/product', {
      name, price, stock, discount, image_url, category_id
    },
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    })

    alert('Row added successfully')
    router.push('/admin/product')

    return res.data
  }

  const patchProduct = async (id, name, price, stock, discount, image_url, category_id) => {
    const res = await axios.patch(`https://gadgetout-products-server.vercel.app/product/${id}`, {
      name, price, stock, discount, image_url, category_id
    },
    {
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    })

    alert('Row edited successfully')
    router.push('/admin/product')
    return res.data
  }

  const deleteProduct = async (id) => {
    await axios.delete(`https://gadgetout-products-server.vercel.app/product/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })

    alert('Row deleted successfully')
    getProducts()
  }

  return { product, page, totalPages, limitedStock, getProducts, getProductById, getProductByPage, searchProduct, getLimitedStock, postProduct, patchProduct, deleteProduct }
})
