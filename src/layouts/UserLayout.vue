<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '../stores/category'
import { useAuthStore } from '../stores/auth'
import router from '../router'

const role = ref('user')
const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const showCategories = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  console.log('clicked')
  if (searchQuery.value) {
    router.push({ name: 'CatalogSearch', params: { search: searchQuery.value } })
  }
}

function toggleCategoriesTrue () {
  showCategories.value = true
}

function toggleCategoriesFalse () {
  showCategories.value = false
}
</script>

<template>
  <!-- v-if role === user -->
  <div v-if="role === 'user'">
    <div class="font-poppins">
      <header class="px-16 py-6 flex justify-between items-center bg-blue-dark">
        <div class="flex items-center gap-16">
          <h2
            class="text-white text-2xl font-semibold hover:scale-125 transition-all ease-in-out duration-100"
          >
            <router-link to="/">GadgetOut</router-link>
          </h2>
          <div class="flex gap-4 bg-white rounded-2xl">
            <input
              v-model="searchQuery"
              class="w-[20rem] px-6 py-4 rounded-2xl focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <button
              @click="handleSearch"
              class="bg-yellow-dark text-white px-8 py-2 rounded-2xl hover:bg-yellow-600"
            >
              Search
            </button>
          </div>
        </div>
        <div class="text-white flex gap-12">
          <div v-if="!authStore.user">
            <router-link class="hover:scale-110 transition-all ease-in-out duration-100" to="/login">
              <v-icon class="mr-2 scale-125" name="fa-regular-user" />
              Login
            </router-link>
          </div>
          <router-link class="hover:scale-110 transition-all ease-in-out duration-100" to="/wishlist">
            <v-icon class="mr-2 scale-125" name="bi-heart" /> Wishlist
          </router-link>
          <router-link class="hover:scale-110 transition-all ease-in-out duration-100" to="/cart">
            <v-icon class="mr-2 scale-125" name="bi-cart3" /> Cart
          </router-link>
        </div>
      </header>
      <nav class="w-full px-16 bg-[#f4f4f4] flex justify-between items-center">
        <div class="flex items-center gap-16">
          <div class="relative">
            <div
              class="p-4 bg-yellow-dark text-white hover:bg-yellow cursor-pointer"
              @mouseover="toggleCategoriesTrue"
              @mouseleave="toggleCategoriesFalse"
            >
              Browse categories
            </div>
            <div
              class="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg p-4"
              v-show="showCategories"
              @mouseover="toggleCategoriesTrue"
              @mouseleave="toggleCategoriesFalse"
            >
              <!-- loop categories -->
              <ul class="space-y-2">
                <li v-for="item in categoryStore.category" :key="item"
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link :to="{name: 'CategoryProduct', params:{id: item.category_id}}">{{ item.name }}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <ul class="flex gap-12 text-gray-dark">
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link :to="{name: 'Catalog'}">Catalog</router-link>
            </li>
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/catalog">Brands</router-link>
            </li>
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/about">About us</router-link>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-blue-dark font-semibold">30 Days Free Return</p>
        </div>
      </nav>
      <slot></slot>
      <footer class="bg-blue-dark py-8 px-20 text-white flex justify-center">
        <p class="font-sora text-xs">Kelompok 3 Superbootcamp Nodejs (2024)</p>
      </footer>
    </div>
  </div>

  <div v-else>
    <div>Something Wrong</div>
  </div>
</template>
