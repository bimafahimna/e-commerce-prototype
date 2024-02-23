<template>
    <AdminLayout>
        <div class="py-20 flex flex-col justify-center px-16">
            <h1 class="font-bold text-2xl text-center">Products</h1>
            <RouterLink :to="{name: 'AddProduct'}" class="flex justify-end">
                <button class="mt-10 bg-yellow-400 text-white w-fit px-4 py-2 rounded">Add Product</button>
            </RouterLink>
            <table class="text-center mt-4 mx-auto table-fixed">
                <thead>
                    <tr class="bg-blue-light table-row">
                        <th class="py-2 px-6">No</th>
                        <th class="py-2 px-6">Name</th>
                        <th class="py-2 px-6">Image</th>
                        <th class="py-2 px-6">Category</th>
                        <th class="py-2 px-6">Price</th>
                        <th class="py-2 px-6">Stock</th>
                        <th class="py-2 px-6">Discount</th>
                        <th class="py-2 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in productStore.product" :key="item.product_id" class="bg-gray-light table-row">
                        <td class="py-2 px-6">{{ index+1 }}</td>
                        <td class="py-2 px-6 max-w-72">{{ item.name }}</td>
                        <td class="py-2 px-6"><img :src="item.image_url" :alt="item.name" class="w-20"></td>
                        <td class="py-2 px-6">{{ item.category }}</td>
                        <td class="py-2 px-6">Rp {{ item.price }}</td>
                        <td class="py-2 px-6">{{ item.stock }} pcs</td>
                        <td class="py-2 px-6">{{ item.discount * 100 }}%</td>
                        <td class="flex gap-2 justify-center py-2 px-6">
                            <RouterLink :to="{name: 'EditProduct', params: {id: item.product_id}}"><button class="bg-yellow-400 p-2 rounded text-white">Edit</button></RouterLink>
                            <button class="bg-red-500 p-2 rounded text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between mt-8">
                <p class="font-bold">Page {{ productStore.page }} of {{ productStore.totalPages }}</p>
                <ul class="flex">
                    <li v-if="productStore.page > 1" @click="fetchPage(productStore.page - 1)"><button class="border-2 border-blue-dark py-2 px-4">Previous</button></li>
                    <li><button v-for="index in productStore.totalPages"
                        :key="index"
                        class="border-2 border-blue-dark py-2 px-4"
                        @click="fetchPage(index)">{{ index }}</button></li>
                        <li v-if="productStore.page < productStore.totalPages" @click="fetchPage(productStore.page + 1)"><button class="border-2 border-blue-dark py-2 px-4">Next</button></li>
                </ul>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../../layouts/AdminLayout.vue'
import { useProductStore } from '../../../stores/product'

const productStore = useProductStore()
productStore.getProductByPage(1)

const fetchPage = (page) => {
  productStore.getProductByPage(page)
}
</script>
