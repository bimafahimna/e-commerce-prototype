<template>
    <AdminLayout>
        <div class="py-10 flex flex-col justify-center px-10">
            <h1 class="font-bold text-2xl text-center">Products</h1>
            <table class="text-center mt-20 mx-auto table-fixed">
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
                    <tr class="bg-gray-light table-row">
                        <td class="py-2 px-6">1</td>
                        <td class="py-2 px-6 max-w-72">Phone</td>
                        <td class="py-2 px-6">Image</td>
                        <td class="py-2 px-6">Phone</td>
                        <td class="py-2 px-6">100</td>
                        <td class="py-2 px-6">100</td>
                        <td class="py-2 px-6">100</td>
                        <td class="flex gap-2 justify-center py-2 px-6">
                            <button class="bg-yellow-400 p-2 rounded text-white">Edit</button>
                            <button class="bg-red-500 p-2 rounded text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../../layouts/AdminLayout.vue';


</script>