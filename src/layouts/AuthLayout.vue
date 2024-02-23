<template>
    <div
        :class="['flex flex-col justify-center items-center pb-20 bg-blue-dark font-poppins', customClass]"
    >
    <h1 @click="goToHome" :class="[!isSubmitting && 'transform transition-transform hover:scale-110 cursor-pointer']" class="font-sora text-white font-bold my-10 text-3xl duration-300">Gadget<span class="text-red-500">Out</span></h1>
        <slot></slot>
    </div>
    <footer class="bg-blue-dark py-6 px-10 border-t border-white text-white flex justify-center">
                <p class="font-sora text-xs">Kelompok 3 Superbootcamp Nodejs (2024)</p>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  customClass: String,
  isSubmitting: {
    type: Boolean,
    default: false,
    required: true
  }
})

const goToHome = () => {
  if (!props.isSubmitting) {
    router.push('/')
  }
}
</script>
