<template>
    <AdminLayout>
        <div class="py-20 flex flex-col justify-center px-16">
            <h1 class="font-bold text-2xl text-center">Category</h1>
            <RouterLink :to="{name: 'AddCategory'}" class="mx-auto">
                <button class="mt-10 bg-yellow-400 text-white w-fit px-4 py-2 rounded">Add Category</button>
            </RouterLink>
            <table class="text-center mt-4 w-1/2 mx-auto">
                <thead>
                    <tr class="bg-blue-light">
                        <th class="py-2 px-6">No</th>
                        <th class="py-2 px-6">Name</th>
                        <th class="py-2 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in categoryStore.category" :key="item.category_id" class="bg-gray-light">
                        <td class="py-2 px-6">{{ index+1 }}</td>
                        <td class="py-2 px-6">{{ item.name }}</td>
                        <td class="flex gap-2 justify-center py-2 px-6">
                            <RouterLink :to="{name: 'EditCategory', params: {id: item.category_id}}"><button class="bg-yellow-400 p-2 rounded text-white">Edit</button></RouterLink>
                            <button @click="handleDelete(item.category_id)" class="bg-red-500 p-2 rounded text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between mt-8 w-1/2 mx-auto">
                <p class="font-bold">Page {{ categoryStore.page }} of {{ categoryStore.totalPages }}</p>
                <ul class="flex">
                    <li v-if="categoryStore.page > 1"><button class="border-2 border-blue-dark py-2 px-4">Previous</button></li>
                    <li><button v-for="index in categoryStore.totalPages"
                        :key="index"
                        class="border-2 border-blue-dark py-2 px-4"
                        @click="fetchPage(index)">{{ index }}</button></li>
                </ul>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { useCategoryStore } from '../../../stores/category'

const categoryStore = useCategoryStore()
categoryStore.getCategories().then()

const handleDelete = (id) => {
  categoryStore.deleteCategory(id)
}

const fetchPage = (page) => {
  categoryStore.getCategoryByPage(page)
}
</script>
