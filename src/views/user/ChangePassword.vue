<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import AuthLayout from '../../layouts/AuthLayout.vue'
import ErrorCard from '../../components/ErrorCard.vue'

const router = useRouter()

const store = useAuthStore()

const { changePassword } = store

const show = ref(false)
const inputs = reactive({
  oldPassword: '',
  newPassword: ''
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

  if (confirmationPassword.value !== inputs.newPassword) {
    isError.value = true
    isSubmitting.value = false
    errorMessage.value = 'Oops! The New passwords you entered do not match'
    return
  }

  const err = await changePassword(inputs)

  if (err) {
    isError.value = true
    isSubmitting.value = false
    errorMessage.value = err.response.data.error
    return
  }

  router.push('/profile')
}
</script>

<template>
  <AuthLayout :is-submitting="isSubmitting">
    <div class="bg-white p-8 rounded shadow-md font-poppins w-4/12">
      <h2 class="text-2xl font-semibold text-center mb-1">Change Password</h2>
      <p class="text-center text-gray-400 text-sm mb-4">Please use strong combination for your password!</p>
      <form method="POST" @submit="handleSubmit">
        <div class="text-blue-dark my-6">
          <router-link to="/profile" class="hover:underline"
            >Back to
            <span class="font-semibold hover:underline">Profile</span>
          </router-link>
        </div>
        <div class="mb-4">
          <label for="oldPassword" class="block text-gray-700">Current Password</label>
          <input
            v-model="inputs.oldPassword"
            minlength="8"
            required
            type="password"
            name="oldPassword"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />

        </div>
        <div class="mt-8">
            <span class="block text-gray-700">New Password <span class="text-red-600">*</span></span>
        </div>
        <div class="mb-4">
          <label for="newPassword" class="block text-gray-700">Password</label>
          <input
            v-model="inputs.newPassword"
            minlength="8"
            required
            :type="show ? 'text' : 'password'"
            name="newPassword"
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
          <label for="confirmationPassword" class="block text-gray-700">Verify Password</label>
          <input
            v-model="confirmationPassword"
            minlength="8"
            required
            type="password"
            name="confirmationPassword"
            class="bg-blue-light mt-1 px-4 py-2 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark"
          />
        </div>
        <ErrorCard
          v-show="isError"
          :message="errorMessage"
        />
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-dark text-lg font-semibold w-full text-white px-4 py-2 rounded hover:bg-blue-hover disabled:bg-blue-disable transition duration-300 ease-in-out"
          >
            <span v-if="isSubmitting">Changing...</span>
            <span v-else>Change Password</span>
          </button>
        </div>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
