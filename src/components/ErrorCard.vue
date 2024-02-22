<script setup>
import { defineProps } from 'vue'

defineProps({
  message: String
})
</script>

<template>
    <div class="text-red-600 bg-[#ffe6e6] px-4 py-2 rounded font-medium mt-5">
        {{ message }}
    </div>
</template>
