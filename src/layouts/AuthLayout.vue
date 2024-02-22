<template>
    <div
        :class="['flex flex-col justify-center items-center pb-20 bg-blue-dark font-poppins', customClass]"
    >
    <h1 class="font-sora text-white font-bold my-10 text-3xl">Gadget<span class="text-red-500">Out</span></h1>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
  customClass: String
})
</script>
