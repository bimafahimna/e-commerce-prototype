<template>
    <AdminLayout>
        <div class="py-10 flex flex-col justify-center px-10">
            <RouterLink :to="{name: 'Category'}">
                <button class="bg-red-500 text-white w-fit px-4 py-2 rounded">Back</button>
            </RouterLink>
            <h1 class="font-bold text-2xl text-center">Category</h1>
            <div class="flex flex-col gap-4 mt-20 mx-auto text-center">
                <label for="name">Category name</label>
                <input v-model="categoryName" type="text" class="w-56 border-2 rounded p-2">
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
import { useCategoryStore } from '../../../stores/category'
import { onMounted, ref } from 'vue'

const props = defineProps(['id'])

const categoryStore = useCategoryStore()

const categoryName = ref('')

if (props.id) {
  onMounted(() => {
    categoryStore.getCategoryById(props.id).then(res => {
      categoryName.value = res.name
    })
  })
}

const handleSubmit = () => {
  try {
    if (props.id) {
      categoryStore.patchCategory(props.id, categoryName.value)
    } else {
      categoryStore.postCategories(categoryName.value).then(res => console.log(res))
    }
  } catch (error) {
    alert(error)
  }
}
</script>
