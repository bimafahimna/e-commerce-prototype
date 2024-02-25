<template>

    <UserLayout>

        <div class="flex justify-center border-b-2 my-4 w-auto">

            <div class="text-4xl text-center mb-2 self-center">
                Payment Success
            </div>

            
        </div>

        <div class="flex justify-center mb-4">

            <button
            @click="handleOk"
            class="px-6 py-2 border w-3/12 self-center
            border-1 rounded-full bg-green-500 
            text-[#fdfdfd] font-medium"
            >
                Ok
            </button>

        </div>
        
    </UserLayout>
    
</template>

<script setup>
// Import Component
import { storeToRefs } from "pinia";
import UserLayout from "../../../layouts/UserLayout.vue";

// Import state
import { usePaymentStore } from "../../../stores/payment"

// Import Dependencies
import { useRouter } from "vue-router"

const router = useRouter()

// Payment State
const paymentStore = usePaymentStore()
const {isPaymentCreated} = storeToRefs(paymentStore)

// Handle
const handleOk = () => {
    isPaymentCreated.value = false
    router.push('/')
}


</script>

<style scoped>

</style>