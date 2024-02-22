// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const loginUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/login`
const registerUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/register`
const changePasswordUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/change-password`

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const isRegisterSuccess = ref(false)

  const authLogin = async (input) => {
    try {
      const res = await axios.post(loginUrl, input)
      const { username, role, token } = res.data
      user.value = { username, role, token }

      localStorage.setItem('user', JSON.stringify({ username, role, token }))
      isRegisterSuccess.value = false
    } catch (err) {
      return err
    }
  }

  const authRegister = async (input) => {
    try {
      await axios.post(registerUrl, input)

      isRegisterSuccess.value = true
    } catch (err) {
      return err
    }
  }

  const changePassword = async (input) => {
    try {
      await axios.patch(changePasswordUrl, input, { headers: { Authorization: 'Bearer ' + user.value.token } })
    } catch (err) {
      return err
    }
  }

  return { user, authLogin, isRegisterSuccess, authRegister, changePassword }
})
