import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({})
  const user = JSON.parse(localStorage.getItem('user'))

  const getCartById = async (id) => {
    const res = await axios.get(
      `https://gadgetout-order-cart-server.vercel.app/cart/${id}`
    )

    let mappedData = res.data.data
    let total_quantity = 0

    mappedData.cart_id = mappedData.id

    mappedData.items.forEach(el => {
      total_quantity += el.quantity

    });
    
    mappedData.total_quantity=total_quantity

    cart.value = mappedData
  }


  return { cart, getCartById}
})
