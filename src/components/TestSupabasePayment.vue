<!-- This is example how to upload file to supabase storage and get the url of the file -->
<script setup>
import { ref } from 'vue'
import { supabasePayment } from '../lib/supabasePayment'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const imageUrl = ref('')
const store = useAuthStore()
const { user } = storeToRefs(store)

const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file) {
    alert('No image error')
    return
  }

  const { data, error } = await supabasePayment
    .storage
    .from('payment-confirmation')
    .upload('payment' + '/' + user.value.username + '/' + `payment_${user.value.username}_${Date.now()}.png`, file)
  if (error) {
    console.log(error)
    alert(error)
    return
  }
  imageUrl.value = `https://bemhvbakalhcklhasakn.supabase.co/storage/v1/object/public/${data.fullPath}`
}

</script>

<template>
  <div v-if="!imageUrl" class="relative w-32 h-32 bg-blue-300 hover:bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
  <input type="file" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" @input="uploadImage" accept="image/*" />
    <v-icon scale="1.5" name="hi-upload" />
  </div>
  <img v-else  class="relative w-32 h-32  rounded-lg flex items-center justify-center overflow-hidden" :src="imageUrl" alt="">
</template>
