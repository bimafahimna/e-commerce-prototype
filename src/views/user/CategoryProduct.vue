<template>
    <UserLayout>
        <div class="grid grid-cols-4 px-32 py-10">
            <div>
                <p class="font-bold">Filter</p>
                <div class="mt-4 bg-gray-light w-4/5 rounded divide-y-2 shadow">
                    <div>
                        <div @click="showDiscount = !showDiscount" class="flex justify-between p-2">
                            <p class="text-sm font-bold">Discount</p>
                            <div v-if="showDiscount">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg>
                            </div>
                            <div v-if="!showDiscount">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                        <div v-if="showDiscount" class="flex items-center gap-1 px-6 pb-2">
                            <input v-model="query.filterDiscount" value="discount" id="discount" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                            <label for="discount" class="text-sm">Product on Discount</label>
                        </div>
                    </div>
                    <div>
                        <div @click="showBrand = !showBrand" class="flex justify-between p-2">
                            <p class="text-sm font-bold">Brand</p>
                            <div v-if="showBrand">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg>
                            </div>
                            <div v-if="!showBrand">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                        <div v-if="showBrand" class="px-6 pb-2">
                            <div class="flex items-center gap-1 mb-2">
                                <input id="brand" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="brand" class="text-sm">Samsung</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div @click="showSort = !showSort" class="flex justify-between p-2">
                            <p class="text-sm font-bold">Sort by</p>
                            <div v-if="showSort">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg>
                            </div>
                            <div v-if="!showSort">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                        <div v-if="showSort" class="px-6 pb-2">
                            <div class="flex items-center gap-1 mb-2">
                                <input v-model="query.filterSort" value="desc" id="sort" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="sort" class="text-sm">Newest</label>
                            </div>
                            <div class="flex items-center gap-1 mb-2">
                                <input v-model="query.filterSort" value="asc" id="sort" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="sort" class="text-sm">Oldest</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-3">
                <p class="mb-6">Page {{ categoryStore.page }} of {{ categoryStore.totalPages }} for <b>{{ categoryStore.categoryProduct.name }}</b></p>
                <div v-if="categoryStore.itemCategoryProduct.length > 0">
                    <div class="grid grid-cols-4 grid-flow-row gap-4">
                        <!-- products -->
                        <div v-for="item in categoryStore.itemCategoryProduct" :key="item" class="p-6 border-2 shadow-lg rounded-xl min-w-56 w-56">
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
                    <div class="flex justify-center mt-10">
                        <ul v-for="n in categoryStore.totalPages" :key="n">
                            <li v-if="shouldDisplay(n)" :key="n">
                                <button
                                @click="fetchPage(n)"
                                :class="{ 'border-b-2': n === categoryStore.page }"
                                class="py-2 px-4"
                                >
                                {{ n }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="categoryStore.itemCategoryProduct.length === 0">
                    <p class="flex justify-center p-4 bg-red-300 rounded-xl font-bold">Product does not exist in this category</p>
                </div>
            </div>
        </div>
    </UserLayout>
</template>

<script setup>
import numeral from 'numeral'
import UserLayout from '../../layouts/UserLayout.vue'
import { useCategoryStore } from '../../stores/category'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps(['id'])

const showDiscount = ref(true)
const showBrand = ref(true)
const showSort = ref(true)

const query = ref({
  filterSort: '',
  filterDiscount: ''
})

const categoryStore = useCategoryStore()
categoryStore.getCategories()

const filterProduct = async () => {
  let queryString = ''
  if (query.value.filterDiscount) {
    queryString += `filter=${query.value.filterDiscount}&`
  }
  if (query.value.filterSort) {
    queryString += `sort=${query.value.filterSort}`
  }
  console.log(queryString)
}

const shouldDisplay = (n) => {
  if (categoryStore.page <= 2) {
    return n <= 3
  } else if (categoryStore.page >= categoryStore.totalPages - 1) {
    return n > categoryStore.totalPages - 3
  } else {
    return Math.abs(categoryStore.page - n) <= 1
  }
}

const fetchPage = (page) => {
  categoryStore.getCategoryById(props.id, page)
}

onMounted(() => {
  categoryStore.getCategoryById(props.id, categoryStore.page)
})

watchEffect(() => {
  filterProduct()
})
</script>
