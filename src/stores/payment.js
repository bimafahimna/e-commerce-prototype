import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([])
  const user = JSON.parse(localStorage.getItem('user'))
  const isPaymentCreated = ref(false)

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  const getAllPaymentByAdmin = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_PAYMENT_ENDPOINT}/admin`,
      {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }
    )

    const mappedData = res.data.map(item => ({
      payment_id: item.payment_id,
      cart_id: item.cart_id,
      user_id: item.user_id,
      username: item.username,
      total_price: item.total_price,
      order_item: item.order_item,
      payment_option: item.payment_option,
      payment_date: formatDate(new Date(item.createdAt)),
      confirmation: item.confirmation,
      status: item.status
    }))

    payments.value = mappedData
  }

  const createPaymentByUser = async (input) => {
    try {
      input.username = user.username
      isPaymentCreated.value = true

      const res = await axios.post(
        `${import.meta.env.VITE_PAYMENT_ENDPOINT}/user`,
        input,
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        }
      )

      alert('Payment created successfully')
    } catch (err) {
      isPaymentCreated.value = false
      return err
    }
  }

  return { payments, getAllPaymentByAdmin, createPaymentByUser, isPaymentCreated }
})
