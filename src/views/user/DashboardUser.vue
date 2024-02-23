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
            <div class="mt-4 lg:grid lg:grid-cols-6 lg:grid-flow-row flex max-w-full overflow-x-auto lg:gap-8 gap-2 scrollbar-hide">
                <div v-for="item in categoryStore.category" :key="item" class="bg-yellow-dark text-white min-w-fit h-fit py-4 px-8 rounded-xl flex justify-center">
                    {{ item.name }}
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
                <div class="p-6 border-2 shadow-lg rounded-xl min-w-56 w-56">
                    <img src="https://cdn.eraspace.com/media/catalog/product/o/p/oppo_reno11_f_5g_palm_green_1.jpg" alt="" class="w-56 mx-auto">
                    <div class="mt-4 text-sm">
                        <p>OPPO Reno11 F 5G 8/256GB - Palm Green</p>
                        <p class="font-bold my-1">Rp 2.599.000</p>
                        <div class="flex items-center gap-1 font-bold">
                            <p class="p-1 bg-red-600 rounded text-white">31%</p>
                            <p class="line-through text-gray-600">Rp 4.599.000</p>
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
                <div class="p-6 border-2 shadow-lg rounded-xl min-w-56 w-56">
                    <img src="https://cdn.eraspace.com/media/catalog/product/o/p/oppo_reno11_f_5g_palm_green_1.jpg" alt="" class="w-56 mx-auto">
                    <div class="mt-4 text-sm">
                        <p>OPPO Reno11 F 5G 8/256GB - Palm Green</p>
                        <p class="font-bold my-1">Rp 2.599.000</p>
                        <div class="flex items-center gap-1 font-bold">
                            <p class="p-1 bg-red-600 rounded text-white">31%</p>
                            <p class="line-through text-gray-600">Rp 4.599.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>

<script setup>

import { useCategoryStore } from '../../stores/category'
import UserLayout from '../../layouts/UserLayout.vue'

const categoryStore = useCategoryStore()
categoryStore.getCategories()
</script>
