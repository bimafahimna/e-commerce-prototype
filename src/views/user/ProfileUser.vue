<script setup>
import { useAuthStore } from '../../stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import ErrorCard from '../../components/ErrorCard.vue'
import SuccessCard from '../../components/SuccessCard.vue'

const isEditMode = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)

const store = useAuthStore()
const { getProfile, updateProfile } = store
const { userProfile, user, isChangePasswordSuccess } = storeToRefs(store)

const inputs = reactive({
  username: userProfile.value.username,
  phoneNumber: userProfile.value.phoneNumber,
  address: userProfile.value.address
})

const fetchProfile = async () => {
  await getProfile()
  inputs.username = userProfile.value.username
  inputs.phoneNumber = userProfile.value.phoneNumber
  inputs.address = userProfile.value.address
  isSubmitting.value = false
  isEditMode.value = false
}

onMounted(async () => {
  await getProfile()
  inputs.username = userProfile.value.username
  inputs.phoneNumber = userProfile.value.phoneNumber
  inputs.address = userProfile.value.address
})

const handleEdit = async (event) => {
  isSubmitting.value = true
  isError.value = false
  event.preventDefault()

  const err = await updateProfile(inputs)

  if (err) {
    isError.value = true
    errorMessage.value = err.response.data.error
    isSubmitting.value = false
    inputs.username = userProfile.value.username
    inputs.phoneNumber = userProfile.value.phoneNumber
    inputs.address = userProfile.value.address
    return
  }

  await fetchProfile()
}

const closeMessage = () => {
  isChangePasswordSuccess.value = false
}

onBeforeUnmount(() => {
  isChangePasswordSuccess.value = false
})
</script>

<template>
    <div class="bg-blue-dark min-h-screen text-white">
        <div class="py-8 px-4">
            <h1 class="text-3xl text-center font-bold">{{user.username}}'s <span class="text-red-500">Profile</span></h1>
        </div>
        <div @click="closeMessage" v-show="isChangePasswordSuccess" class="cursor-pointer mb-4">
          <SuccessCard  message="Your password changed successfully."/>
        </div>
        <div class="bg-white text-gray-700 rounded-lg shadow-md mx-auto w-3/4 p-6 mt-8">
              <div class="mb-4 flex justify-between">
                  <label for="username" class="block text-xl text-gray-700"
                  >Username</label
                >
                <input
                  :disabled="!isEditMode || isSubmitting"
                  :class="{pulse: !Boolean(userProfile.username) || isSubmitting}"
                  v-model="inputs.username"
                  autocomplete="off"
                  required
                  minlength="6"
                  maxlength="16"
                  type="text"
                  name="username"
                  class="bg-blue-light w-1/2 px-4 py-2 text-sm block rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark disabled:bg-gray-400"
                />
              </div>
              <div class="mb-4 flex justify-between">
                  <label for="email" class="block text-xl text-gray-700"
                  >Email</label
                >
                <input
                  disabled
                  :class="{pulse: !Boolean(userProfile.email)}"
                  v-model="userProfile.email"
                  required
                  type="text"
                  name="email"
                  class="bg-blue-light w-1/2 px-4 py-2 text-sm block rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark disabled:bg-gray-400"
                />
              </div>
              <div class="mb-4 flex justify-between">
                  <label class="block text-xl text-gray-700"
                  >Password</label
                >
                <div class="w-1/2">
                  <router-link to="/profile/change-password" class="bg-blue-dark text-center text-sm font-normal w-4/10 text-white px-3 py-1 rounded hover:bg-blue-hover hover:text-gray-300 transition duration-300 ease-in-out">Change Password</router-link>
                </div>
              </div>
              <div class="mb-4 flex justify-between">
                  <label for="phoneNumber" class="block text-xl text-gray-700"
                  >Phone Number</label
                >
                <input
                  :disabled="!isEditMode || isSubmitting"
                  :class="{pulse: !Boolean(userProfile.phoneNumber) || isSubmitting}"
                  v-model="inputs.phoneNumber"
                  autocomplete="off"
                  required
                  minlength="12"
                  type="text"
                  name="phoneNumber"
                  class="bg-blue-light w-1/2 px-4 py-2 text-sm block rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark disabled:bg-gray-400"
                />
              </div>
              <div class="mb-4 flex justify-between">
                <label for="address" class="block text-xl text-gray-700">Address</label>
                <textarea
                  :disabled="!isEditMode || isSubmitting"
                  :class="{pulse: !Boolean(userProfile.address) || isSubmitting}"
                  v-model="inputs.address"
                  autocomplete="off"
                  required
                  minlength="6"
                  type="text"
                  name="address"
                  class="bg-blue-light h-24 w-1/2 resize-none mt-1 px-4 py-2 text-sm block rounded-md border-gray-300 shadow-sm focus:border-blue-dark focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 focus:outline-blue-dark disabled:bg-gray-400"
                />
              </div>
              <ErrorCard v-show="isError" :message="errorMessage"/>
              <button v-if="!isEditMode" @click="isEditMode = true" class="bg-blue-dark text-lg block mt-5 font-semibold ml-auto text-white px-4 py-2 rounded hover:bg-blue-hover transition duration-300 ease-in-out">Edit Profile</button>
              <div v-if="isEditMode" class="flex justify-center space-x-5 mt-5 ">
                  <button :disabled="isSubmitting" @click="isEditMode = false" class="bg-red-600 text-lg block font-semibold text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 ease-in-out disabled:*:bg-red-300">Cancel</button>
                  <button :disabled="isSubmitting" @click="handleEdit" class="bg-blue-dark text-lg block font-semibold text-white px-4 py-2 rounded hover:bg-blue-hover transition duration-300 ease-in-out disabled:bg-blue-disable">Confirm</button>
              </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.3);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.pulse {
  animation: pulse 1.5s infinite;
}

input[name='username'].pulse, input[name='phoneNumber'].pulse , textarea[name='address'].pulse  {
  color: transparent;
}
</style>
