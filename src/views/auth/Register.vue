<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import AuthLayout from '../../layouts/AuthLayout.vue'
import ErrorCard from '../../components/ErrorCard.vue'

const router = useRouter()

const store = useAuthStore()

const { authRegister } = store

const show = ref(false)
const inputs = reactive({
  username: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: ''
})

const confirmationPassword = ref('')

const isError = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)

const toggleShowPassword = () => {
  show.value = !show.value
}

const handleSubmit = async (event) => {
  isSubmitting.value = true
  isError.value = false
  event.preventDefault()

  if (confirmationPassword.value !== inputs.password) {
    isError.value = true
    isSubmitting.value = false
    errorMessage.value = 'Oops! The passwords you entered do not match'
    return
  }

  const err = await authRegister(inputs)

  if (err) {
    isError.value = true
    isSubmitting.value = false
    errorMessage.value = err.response.data.error
    return
  }

  router.push('/login')
}
</script>

<template>
  <AuthLayout>
    <div class="bg-white p-8 rounded shadow-md font-poppins w-4/12">
      <h2 class="text-2xl font-semibold text-center mb-1">Register</h2>
      <p class="text-center text-gray-400 text-sm mb-4">Come Join Us!</p>
      <form method="POST" @submit="handleSubmit">
        <div class="text-blue-dark my-6">
          <span
            >Already have an account?
            <router-link class="font-semibold hover:underline" to="/login"
              >Login</router-link
            ></span
          >
        </div>
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            v-model="inputs.username"
            autocomplete="off"
            required
            minlength="6"
            maxlength="16"
            type="text"
            name="username"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            v-model="inputs.email"
            required
            type="email"
            name="email"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            v-model="inputs.password"
            minlength="8"
            required
            :type="show ? 'text' : 'password'"
            name="password"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
          <div class="flex">
            <input
              type="checkbox"
              v-model="show"
              class="mt-2 h-4 w-4 border-blue-dark rounded transition duration-300 hover:scale-125 hover:outline-blue-dark hover:border-8"
            />
            <p
              @click="toggleShowPassword"
              class="text-sm mt-1.5 ml-1 cursor-pointer"
            >
              Show Password
            </p>
          </div>
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700"
            >Verify Password</label
          >
          <input
            v-model="confirmationPassword"
            minlength="8"
            required
            type="password"
            name="confirmPassword"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <div class="mb-4">
          <label for="phoneNumber" class="block text-gray-700"
            >Phone Number</label
          >
          <input
            v-model="inputs.phoneNumber"
            autocomplete="off"
            required
            minlength="12"
            type="text"
            name="phoneNumber"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-700">Address</label>
          <textarea
            v-model="inputs.address"
            autocomplete="off"
            required
            minlength="6"
            type="text"
            name="address"
            class="bg-blue-light h-24 resize-none mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <ErrorCard v-show="isError" :message="errorMessage" />
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-dark text-lg font-semibold w-full text-white px-4 py-2 rounded hover:bg-blue-hover disabled:bg-blue-disable transition duration-300 ease-in-out"
          >
            <span v-if="isSubmitting">Registering...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
