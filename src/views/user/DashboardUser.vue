<template>
    <UserLayout>
        <div class="lg:grid lg:grid-cols-2 font-sora gap-10 px-20 h-fit">
            <div class="lg:my-auto mt-16 text-gray-800 lg:h-fit text-center">
                <p class="lg:text-2xl lg:mb-2 text-xs">Ditch the distractions, unlock your potential:</p>
                <p class="lg:text-5xl text-lg">Tech that empowers you.</p>
            </div>
            <div class="flex justify-center my-auto py-10">
                <img src="https://cdn.eraspace.com/media/catalog/product/o/p/oppo_a79_5g_dazzling_purple_1.jpg" alt="banner-img" class="w-4/5 h-fit">
            </div>
        </div>
        <div class="bg-gray-light p-6 font-poppins lg:px-32 px-14">
            <div class="flex justify-between">
                <p class="font-bold text-center">Categories</p>
                <p class="underline">See all</p>
            </div>
            <div class="mt-4 lg:grid lg:grid-cols-6 lg:grid-flow-row flex max-w-full overflow-x-auto lg:gap-6 gap-2 scrollbar-hide">
                <div v-for="item in categoryStore.category.slice(0,6)" :key="item.category_id">
                    <RouterLink :to="{ name: 'CategoryProduct', params:{id:item.category_id}}">
                        <div class="bg-yellow-dark text-white min-w-fit h-fit py-4 px-8 rounded-xl flex justify-center">
                            {{ item.name }}
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="font-poppins mt-10 mb-10 lg:px-32 px-14">
            <div class="flex items-center justify-between gap-4 mb-6">
                <p class="text-xl font-bold">Newest Products</p>
                <p class="underline">See all</p>
            </div>
            <div class="flex gap-4 max-w-full overflow-x-auto scrollbar-hide">
                <!-- max 6 -->
                <div v-for="item in productStore.newestProduct.slice(0,10)" :key="item.product_id" class="p-6 border-2 shadow-lg rounded-xl min-w-56 w-56">
                    <img :src="item.image_url" :alt="item.name" class="w-56 mx-auto">
                    <div class="mt-4 text-sm">
                        <p>{{ item.name }}</p>
                        <p v-if="!item.discount" class="font-bold my-1">Rp {{ numeral(item.price).format('0,0') }}</p>
                        <div v-if="item.discount">
                            <p class="font-bold my-1">Rp {{ numeral(item.price - (item.price*item.discount)).format('0,0') }}</p>
                            <div class="flex items-center gap-1 font-bold">
                                <p class="p-1 bg-red-600 rounded text-white">{{ item.discount * 100 }}%</p>
                                <p class="line-through text-gray-600">{{ numeral(item.price).format('0,0') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-light p-6 font-poppins lg:px-32 px-14">
            <div class="flex justify-between">
                <p class="font-bold text-center">Brands</p>
                <p class="underline">See all</p>
            </div>
            <div class="mt-4 lg:grid lg:grid-cols-6 lg:grid-flow-row flex max-w-full overflow-x-auto lg:gap-8 gap-2 scrollbar-hide">
                <div class="bg-yellow-dark text-white min-w-fit h-fit py-4 px-8 rounded-xl flex justify-center">
                    brands
                </div>
            </div>
        </div>
        <div class="font-poppins mt-10 mb-10 lg:px-32 px-14">
            <div class="flex items-center justify-between gap-4 mb-6">
                <p class="text-xl font-bold">Products On Sale</p>
                <p class="underline">See all</p>
            </div>
            <div class="flex gap-4 max-w-full overflow-x-auto scrollbar-hide">
                <div v-for="item in productStore.discountProduct.slice(0,10)" :key="item" class="p-6 border-2 shadow-lg rounded-xl min-w-56 w-56">
                    <img :src="item.image_url" :alt="item.name" class="w-56 mx-auto">
                    <div class="mt-4 text-sm">
                        <p>{{ item.name }}</p>
                        <p class="font-bold my-1">Rp {{ numeral(item.price).format('0,0') }}</p>
                        <div class="flex items-center gap-1 font-bold">
                            <p class="p-1 bg-red-600 rounded text-white">{{ item.discount*100 }}%</p>
                            <p class="line-through text-gray-600">Rp {{ numeral(item.price).format('0,0') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>

<script setup>
import numeral from 'numeral'
import { useCategoryStore } from '../../stores/category'
import UserLayout from '../../layouts/UserLayout.vue'
import { useProductStore } from '../../stores/product'

const categoryStore = useCategoryStore()
const productStore = useProductStore()
categoryStore.getCategories()
productStore.getNewestProduct()
productStore.getDiscountProduct()
</script>
