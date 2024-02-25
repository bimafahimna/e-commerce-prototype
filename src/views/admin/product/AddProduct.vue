<template>
    <AdminLayout>
        <div class="py-10 flex flex-col justify-center px-10">
            <RouterLink :to="{name: 'Product'}">
                <button class="bg-red-500 text-white w-fit px-4 py-2 rounded">Back</button>
            </RouterLink>
            <h1 class="font-bold text-2xl text-center">Product</h1>
            <div class="flex flex-col gap-8 mt-20 mx-auto bg-gray-light rounded-xl p-8 w-1/2">
              <div>
                <p class="font-bold">Product name</p>
                <input v-model="product.name" type="text" class="w-full border-2 rounded p-2">
              </div>
              <div>
                <p class="font-bold">Product category</p>
                <select v-model="product.category_id" class="w-full border-2 rounded p-2" name="category">
                  <option v-for="category in categoryStore.category" :value="category.category_id" :key="category.category_name">{{ category.name }}</option>
                </select>
              </div>
              <div>
                <p class="font-bold">Product stock</p>
                <input v-model="product.stock" type="number" class="w-full border-2 rounded p-2" placeholder="10">
              </div>
              <div>
                <p class="font-bold">Product price</p>
                <input v-model="product.price" type="number" class="w-full border-2 rounded p-2" placeholder="1000000">
              </div>
              <div>
                <p class="font-bold">Product discount</p>
                <input v-model="product.discount" type="number" class="w-full border-2 rounded p-2" placeholder="0,1 for 10%">
              </div>
              <div>
                <p class="font-bold mb-2">Product Image</p>
                <div v-if="!product.image_url" class="relative mx-auto w-32 h-32 bg-blue-300 hover:bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
                  <input type="file" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" @input="uploadImage" accept="image/png" />
                  <v-icon scale="1.5" name="hi-upload" />
                </div>
                <img v-else  class="relative mx-auto w-32 h-32  rounded-lg flex items-center justify-center overflow-hidden" :src="product.image_url" :alt="product.name">
              </div>
                <button @click="handleSubmit" class="bg-yellow-400 text-white w-fit px-4 py-2 rounded mx-auto">
                    <div v-if="props.id">Edit</div>
                    <div v-else>Submit</div>
                </button>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { useProductStore } from '../../../stores/product'
import { useCategoryStore } from '../../../stores/category'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { supabase } from '../../../lib/supabaseClient'

const props = defineProps(['id'])

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const { category } = storeToRefs(categoryStore)

const product = ref({
  name: '',
  price: '',
  stock: '',
  discount: '',
  image_url: '',
  category_id: 0
})

if (props.id) {
  onMounted(() => {
    productStore.getProductById(props.id).then(res => {
      product.value.name = res.name
      product.value.price = res.price
      product.value.stock = res.stock
      product.value.discount = res.discount
      product.value.image_url = res.image_url
      product.value.category_id = res.category_id
    })
  })
}

const handleSubmit = () => {
  try {
    if (props.id) {
      productStore.patchProduct(
        props.id,
        product.value.name,
        product.value.price,
        product.value.stock,
        product.value.discount,
        product.value.image_url,
        product.value.category_id)
    } else {
      productStore.postProduct(
        product.value.name,
        product.value.price,
        product.value.stock,
        product.value.discount,
        product.value.image_url,
        product.value.category_id)
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  categoryStore.getCategories()
  console.log(categoryStore.category)
})

const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file) {
    alert('Invalid file')
    return
  }

  if (!product.value.category_id) {
    alert('Pick one category pleases')
    return
  }

  const selectedCategory = category.value.find(item => item.category_id === product.value.category_id)

  const { data, error } = await supabase
    .storage
    .from('products')
    .upload('Public' + '/' + selectedCategory.name + '/' + `product_${Date.now()}.png`, file)
  if (error) {
    console.log(error)
    alert(error)
    return
  }
  product.value.image_url = `https://oiuykrvppcybmwgvjeys.supabase.co/storage/v1/object/public/${data.fullPath}`
}
</script>
