<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AuthLayout from '../../layouts/AuthLayout.vue'
import ErrorCard from '../../components/ErrorCard.vue'
import SuccessCard from '../../components/SuccessCard.vue'

const router = useRouter()

const store = useAuthStore()

const { authLogin } = store
const { isRegisterSuccess, user } = storeToRefs(store)

const show = ref(false)
const inputs = reactive({
  email: '',
  password: ''
})
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

  const err = await authLogin(inputs)

  if (err) {
    isError.value = true
    isSubmitting.value = false
    errorMessage.value = err.response.data.error
    return
  }

  if (user.value.role === 'ADMIN') {
    router.push('/admin')
    return
  }
  router.push('/')
}

const closeMessage = () => {
  isRegisterSuccess.value = false
}

onBeforeUnmount(() => {
  isRegisterSuccess.value = false
})
</script>

<template>
  <AuthLayout custom-class="h-full" :is-submitting="isSubmitting">
    <div @click="closeMessage" class="cursor-pointer w-full mb-4" v-show="isRegisterSuccess">
      <SuccessCard message="Congratulations! You have successfully registered."/>
    </div>
    <div class="bg-white p-8 rounded shadow-md font-poppins w-4/12 my-2">
      <h2 class="text-2xl font-semibold text-center mb-1">Login</h2>
      <p class="text-center text-gray-400 text-sm mb-4">Welcome back!</p>
      <form method="POST" @submit="handleSubmit">
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
        <div class="text-blue-dark my-6">
          <span
            >Don't have an account yet?
            <router-link class="font-semibold hover:underline" to="/register"
              >Register</router-link
            ></span
          >
        </div>
        <ErrorCard v-show="isError" :message="errorMessage" />
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-dark text-lg font-semibold w-full text-white px-4 py-2 rounded hover:bg-blue-hover disabled:bg-blue-disable transition duration-300 ease-in-out"
          >
            <span v-if="isSubmitting">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
