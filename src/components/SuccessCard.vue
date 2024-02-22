<script setup>
import { defineProps } from 'vue'

defineProps({
  message: String,
  customClass: String
})
</script>

<template>
    <div
    class="text-green-500 bg-green-200 px-4 py-2 mx-auto text-center rounded font-medium w-4/12"
    :class="[customClass]"
    >
        {{ message }}
    </div>
</template>
