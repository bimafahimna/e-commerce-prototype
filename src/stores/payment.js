import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([])
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  const getPayments = async () => {
    const res = await axios.get('https://gadget-out-payment.vercel.app/payment')

    const mappedData = res.data.map(item => ({
      payment_id: item.payment_id,
      cart_id: item.cart_id,
      user_id: item.user_id,
      payment_option: item.payment_option,
      payment_date: formatDate(new Date(item.payment_date)),
      status: item.status
    }))

    payments.value = mappedData
  }

  return { payments, getPayments }
})
