<!-- This is example how to upload file to supabase storage and get the url of the file -->
<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const imageUrl = ref('')
const categories = ref(['Smartphone', 'PC'])
const selectedCategory = ref('')
const store = useAuthStore()
const { user } = storeToRefs(store)

const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file) {
    alert('No image error')
    return
  }

  if (!selectedCategory.value) {
    alert('Pick one category')
    return
  }

  const { data, error } = await supabase
    .storage
    .from('products')
    .upload('Public' + '/' + selectedCategory.value + '/' + `product_${Date.now()}.png`, file)
  if (error) {
    console.log(error)
    alert(error)
    return
  }
  imageUrl.value = `https://oiuykrvppcybmwgvjeys.supabase.co/storage/v1/object/public/${data.fullPath}`
}

</script>

<template>
    <div class="mb-4 flex items-center">
        <label class="block text-center mx-2 font-semibold text-xl text-gray-700">Categories</label>
        <select class="block w-1/2 px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" v-model="selectedCategory" required>
            <option disabled value="">--Pick Category First--</option>
            <option v-for="category in categories" :value="category" :key="category">
                {{ category }}
            </option>
        </select>
    </div>
    <div v-if="!imageUrl" class="relative w-32 h-32 bg-blue-300 hover:bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" @input="uploadImage" accept="image/png" />
      <v-icon scale="1.5" name="hi-upload" />
    </div>
    <img v-else  class="relative w-32 h-32  rounded-lg flex items-center justify-center overflow-hidden" :src="imageUrl" alt="">

</template>
