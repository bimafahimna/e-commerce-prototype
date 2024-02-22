<script setup>
import { ref } from "vue";

const role = ref("user");
const showCategories = ref(false);

function toggleCategoriesTrue() {
  showCategories.value = true;
}

function toggleCategoriesFalse() {
  showCategories.value = false;
}
</script>

<template>
  <!-- v-if role === user -->
  <div v-if="role === 'user'">
    <div class="font-poppins">
      <header class="px-16 py-6 flex justify-between items-center bg-blue-dark">
        <div class="flex items-center gap-16">
          <h2 class="text-white text-2xl font-semibold">GadgetOut</h2>
          <div class="flex gap-4 bg-white rounded-2xl">
            <input
              class="w-[20rem] px-6 py-4 rounded-2xl focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <button class="bg-yellow-dark text-white px-8 py-2 rounded-2xl">
              Search
            </button>
          </div>
        </div>
        <div class="text-white flex gap-12">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
          <router-link to="/cart">Cart</router-link>
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
              <ul class="space-y-2">
                <li
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link to="/">Apple</router-link>
                </li>
                <li
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link to="/">Samsung</router-link>
                </li>
                <li
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link to="/">Sony</router-link>
                </li>
                <li
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link to="/">LG</router-link>
                </li>
                <li
                  class="text-gray-dark hover:text-blue-dark hover:font-semibold"
                >
                  <router-link to="/">HP</router-link>
                </li>
              </ul>
            </div>
          </div>
          <ul class="flex gap-12 text-gray-dark">
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/">Home</router-link>
            </li>
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/catalog">Catalog</router-link>
            </li>
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/blog">Blog</router-link>
            </li>
            <li class="hover:text-blue-dark hover:font-semibold">
              <router-link to="/pages">Pages</router-link>
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
