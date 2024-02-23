/* eslint-disable camelcase */
// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const loginUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/login`
const registerUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/register`
const changePasswordUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/change-password`
const profileUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/profile`

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const isRegisterSuccess = ref(false)
  const userProfile = ref({})
  const isChangePasswordSuccess = ref(false)

  const router = useRouter()

  const authLogin = async (input) => {
    try {
      const res = await axios.post(loginUrl, input)
      const { username, role, token } = res.data
      user.value = { username, role, token }

      localStorage.setItem('user', JSON.stringify({ username, role, token }))
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

      isChangePasswordSuccess.value = true
    } catch (err) {
      return err
    }
  }

  const getProfile = async () => {
    try {
      const res = await axios.get(profileUrl, { headers: { Authorization: 'Bearer ' + user.value.token } })
      const { username, email, phone_number, address } = res.data
      userProfile.value = { username, email, phoneNumber: phone_number, address }
    } catch (err) {
      return err
    }
  }

  const updateProfile = async (input) => {
    try {
      await axios.patch(profileUrl, input, { headers: { Authorization: 'Bearer ' + user.value.token } })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const handleLogout = () => {
    user.value = null
    localStorage.clear()
    router.push('/login')
  }

  return { user, authLogin, isRegisterSuccess, authRegister, changePassword, isChangePasswordSuccess, userProfile, getProfile, updateProfile, handleLogout }
})
