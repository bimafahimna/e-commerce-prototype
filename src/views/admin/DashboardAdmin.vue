<template>
    <AdminLayout>
        <div class="px-16 py-20">
            <h1 class="font-bold text-center text-2xl">Dashboard</h1>
            <div class="grid grid-cols-3">
                <div class="mt-8 bg-gray-light p-8 rounded-xl mx-auto col-span-2 w-full">
                    <p class="font-bold">Review Order</p>
                    <!-- payment check -->
                    <div class="flex justify-between items-center gap-2 mt-6 bg-blue-dark/50 border-t-2 border-l-2 border-white/50 text-white rounded-xl p-6 shadow-lg h-fit">
                        <div>
                            <p class="text-sm mb-8">Order ID: 1234421341</p>
                            <p>Username: indahkurnias</p>
                            <p>Paid using: Gopay</p>
                            <p>Total: Rp 1000000</p>
                            <p class="font-bold mt-8">24-02-2023 15:00</p>
                        </div>
                        <div>Status: Unchecked</div>
                        <div class="flex gap-2">
                            <button class="bg-green-400 p-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button class="bg-red-400 p-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <!-- payment check 2 -->
                    <div class="flex justify-between items-center gap-2 mt-6 bg-blue-dark/50 border-t-2 border-l-2 border-white/50 text-white rounded-xl p-6 shadow-lg">
                        <div>
                            <p class="text-sm mb-8">Order ID: 1234421341</p>
                            <p>Username: indahkurnias</p>
                            <p>Paid using: Gopay</p>
                            <p>Total: Rp 1000000</p>
                            <p class="font-bold mt-8">24-02-2023 15:00</p>
                        </div>
                        <div>Status: Unchecked</div>
                        <div class="flex gap-2">
                            <button class="bg-green-400 p-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button class="bg-red-400 p-2 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-8 mx-8 p-8 bg-gray-light rounded-xl">
                    <p class="font-bold text-center mb-8">Stock Limited</p>
                    <div v-for="item in productStore.limitedStock" :key="item.product_id" class="bg-blue-dark/50 border-t-2 border-l-2 border-white/50 text-white rounded-xl p-4 mb-3">
                        <img :src="item.image_url" :alt="item.name" class="w-32 rounded-cl mx-auto my-4">
                        <p class="text-sm text-center">{{ item.name }}</p>
                        <p class="bold p-2 bg-red-500/50 text-white rounded-xl w-fit mx-auto mt-6">Stock: {{ item.stock }}</p>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../layouts/AdminLayout.vue'
import { useProductStore } from '../../stores/product'

const productStore = useProductStore()
productStore.getLimitedStock()
</script>
