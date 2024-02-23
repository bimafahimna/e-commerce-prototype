<template>
    <AdminLayout>
        <div class="px-16 py-20">
            <h1 class="font-bold text-center text-2xl">Dashboard</h1>
            <div class="grid grid-cols-3">
                <div class="mt-8 bg-gray-light p-8 rounded-xl mx-auto col-span-2 w-full">
                    <p class="font-bold">Review Order</p>
                    <!-- payment check -->
                    <div v-for="item in paymentStore.payments" :key="item.payment_id" class="flex justify-between items-center gap-2 mt-6 bg-blue-dark/50 border-t-2 border-l-2 border-white/50 text-white rounded-xl p-6 shadow-lg h-fit">
                        <div>
                            <p class="text-sm mb-8">Order ID: {{ item.payment_id }}</p>
                            <p>Username: {{ item.user_id }}</p>
                            <p>Paid using: {{ item.payment_option }}</p>
                            <p>Total: Rp {{ item.total_payment }}</p>
                            <p class="font-bold mt-8">{{ item.payment_date }}</p>
                        </div>
                        <div class="text-center">
                            <p v-if="item.status === false">Status: Unchecked</p>
                            <p v-if="item.status === true">Status: Checked</p>
                            <button @click="showImage = !showImage" class="py-2 px-4 mt-2 hover:bg-gray-light/30 rounded-xl bg-gray-dark/30 shadow">Check payment receipt</button>
                        </div>
                        <div class="flex gap-2">
                            <button v-if="item.status === false" class="bg-green-400 p-2 rounded-xl hover:bg-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button v-if="item.status === false" class="bg-red-400 p-2 rounded-xl hover:bg-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        </div>
                        <!-- dialog -->
                        <div v-if="showImage" class="relative z-10">
                            <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
                            <div class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
                                <div class="relative w-full max-w-md mx-auto rounded-lg bg-white shadow-xl">
                                    <div class="px-6 py-4">
                                        <div class="px-4 pb-4 pt-5">
                                            img
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 px-6 py-3 flex justify-end">
                                        <button @click="showImage = !showImage" class="w-fit rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-8 mx-8 p-8 bg-gray-light rounded-xl">
                    <p class="font-bold text-center mb-8">Stock Running Low</p>
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
import { ref } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'
import { useProductStore } from '../../stores/product'
import { usePaymentStore } from '../../stores/payment'

const productStore = useProductStore()
productStore.getLimitedStock()

const paymentStore = usePaymentStore()
paymentStore.getPayments()

const showImage = ref(false)
</script>
