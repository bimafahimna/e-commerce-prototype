<template>
    <!-- v-if role === admin -->
    <div v-if="role === 'admin'">
        <div class="font-poppins">
            <nav class="py-8 px-20 flex justify-end bg-blue-dark text-white">
                <p>admin_loggedin</p>
            </nav>
            <div class="min-h-screen">
                <aside class="fixed top-0 left-0 z-40 w-64">
                    <div class="px-6 py-6 overflow-y bg-blue-dark h-screen">
                        <div class="flex justify-center font-sora text-2xl font-bold mb-14 text-white"><h1>Gadget</h1><h1 class="text-red-500">Out</h1></div>
                        <ul>
                            <li v-for="item in menuItems" :key="item" class="bg-yellow-dark text-white rounded-xl py-2 px-4 mb-4">
                                <RouterLink :to="{name: item.name}" class="flex gap-2 items-center justify-center">
                                    <div v-html="item.svg"></div>
                                    <p>{{ item.name }}</p>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div class="ml-64">
                    <slot></slot>
                </div>
            </div>
            <footer class="bg-blue-dark py-8 px-20 text-white flex justify-center">
                <p class="font-sora text-xs">Kelompok 3 Superbootcamp Nodejs (2024)</p>
            </footer>
        </div>
    </div>
    <div v-else>
        <p>access denied</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const role = ref('admin')
const menuItems = ref(
  [{
    name: 'Dashboard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-7.5Z" clip-rule="evenodd" />
            </svg>`
  },
  {
    name: 'Product',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            </svg>`
  },
  {
    name: 'Category',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
            </svg>`
  },
  {
    name: 'Payment',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clip-rule="evenodd" />
            </svg>`
  }]
)
</script>
