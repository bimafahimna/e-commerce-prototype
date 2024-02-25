<script setup>
import UserLayout from "../../../layouts/UserLayout.vue";
import LoadingSpinner from "../../../components/LoadingSpinner.vue"
import { usePaymentStore } from "../../../stores/payment";
import { useCartStore } from "../../../stores/cart"

import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router"

// Router
const router = useRouter()

// Payment Store
const paymentStore = usePaymentStore();
const { createPaymentByUser } = paymentStore
const { isPaymentCreated } = storeToRefs(paymentStore)
isPaymentCreated.value = false

const inputs = reactive({
    cart_id: 1,
    username: "",
    payment_option: ""
})

// Cart Store
const cartStore = useCartStore()
const { getCartById } = cartStore
let cartObj = reactive({})

// Handle
const handleSubmitFinal = async (event) => {
    event.preventDefault()
    const err = await createPaymentByUser(inputs)

    if (err) {
        alert(err)
        console.log(err)
    }

    router.push('/payment/success')
}

const paymentStep = reactive({
    address: false,
    payment: true,
    order: false
})

const goToAddress = () => {
    paymentStep.address = true
    paymentStep.payment = false
    paymentStep.order = false
}

const goToPayment = () => {
    paymentStep.address = false
    paymentStep.payment = true
    paymentStep.order = false
}

const goToOrder = async () => {
    loading.value=true

    await getCartById(inputs.cart_id)
    
    const { cart } = storeToRefs(cartStore)
    cartObj = reactive(cart.value)

    loading.value = false
    paymentStep.address = false
    paymentStep.payment = false
    paymentStep.order = true
}

// Currency Format
const rupiahFormat = (price) => {
    const IDRupiah = new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR'
    })

    return IDRupiah.format(price)
}

// Loading Interval
const loading = ref(false)


</script>

<template>
    <UserLayout>

        <LoadingSpinner v-if="loading"/>

        <div class="p-8 font-sora">
        <!-- placeholder breadcrumbs -->
            <div>
                <router-link to="/">Home ></router-link>
                <router-link to="/cart">Cart ></router-link>
                <span @click="goToPayment" class="cursor-pointer">Payment</span>
            </div>

            <div class="w-full flex flex-col items-center">
                <div class="w-full xl:w-[60%]">
                    <div>
                        <div
                        class="p-4 hidden lg:flex justify-center lg:gap-2 w-full font-semibold text-[#232323]"
                        >
                            <h6 class="text-3xl">
                                Payment
                            </h6>
                        </div>
                    </div>

                </div>
                
                <!-- Content -->
                <div class="w-[30%] max-h-[30rem] xl:w-[30%] border border-1 rounded-xl">
                    <!-- Billing Address -->
                    <div class="p-8" v-show="paymentStep.address">

                        <div class="pb-4 flex justify-between font-semibold border-b-2">
                            <p>Billing Address</p>
                        </div>

                        <form method="POST" @submit.prevent="goToPayment">

                            <div class="py-4 flex justify-between border-b-2">

                                <div class="flex flex-wrap">

                                    <label for="firstname" class="block">First Name</label>
                                    <input 
                                    required
                                    id="firstname"
                                    type="text" 
                                    name="firstname"
                                    class="bg-blue-light mt-1 px-4 py-2 text-sm flex w-[40%] 
                                    rounded-md border-gray-300 shadow-sm focus:border-blue-dark 
                                    focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 
                                    focus:outline-blue-dark">
                                    
                                    <label for="lastname" class="block">Last Name</label>
                                    <input 
                                    required
                                    id="lastname"
                                    type="text" 
                                    name="lastname"
                                    class="bg-blue-light mt-1 px-4 py-2 text-sm flex w-[40%] 
                                    rounded-md border-gray-300 shadow-sm focus:border-blue-dark 
                                    focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 
                                    focus:outline-blue-dark">
                                    
                                    <label for="email">Email</label>
                                    <input
                                    required
                                    id="email"
                                    class="bg-blue-light mt-1 px-4 py-2 text-sm flex w-[40%] 
                                    rounded-md border-gray-300 shadow-sm focus:border-blue-dark 
                                    focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 
                                    focus:outline-blue-dark"
                                    type="email">
                                    
                                    <label for="address">Street Address</label>
                                    <input
                                    required
                                    id="address"
                                    class="bg-blue-light mt-1 px-4 py-2 text-sm flex w-[40%] 
                                    rounded-md border-gray-300 shadow-sm focus:border-blue-dark 
                                    focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 
                                    focus:outline-blue-dark"
                                    type="text">
                                    
                                    <label for="phonenumber">Phone Number</label>
                                    <input 
                                    required
                                    id="phonenumber"
                                    class="bg-blue-light mt-1 px-4 py-2 text-sm flex w-[40%] 
                                    rounded-md border-gray-300 shadow-sm focus:border-blue-dark 
                                    focus:ring focus:ring-blue-dark focus:ring-opacity-50 outline-1 
                                    focus:outline-blue-dark"
                                    type="text">

                                </div>

                            </div>

                            <div class="py-8 flex justify-center">

                                <button
                                type="submit"
                                class="px-6 py-2 w-full border border-1 rounded-full bg-yellow-dark text-[#fdfdfd] font-medium"
                                >
                                    Next
                                </button>

                            </div>

                        </form>


                    </div>

                    <!-- Payment -->
                    <div v-show="paymentStep.payment">

                        <div class="m-2 inline-flex border border-b-2 rounded-md">
                            <span class="text-xs px-2 cursor-pointer" @click="goToAddress">Back</span>
                        </div>

                        <div class="px-8 pb-8 pt-4">
                            
                            <div class="pb-4 flex justify-between font-semibold border-b-2">
                                <p>Payment Option</p>
                            </div>
                            
    
                            <form  method="POST" @submit.prevent="goToOrder" >
                                
                                <div class="py-4 flex justify-between border-b-2">
                                    <div>
                                        <input 
                                        class="mb-5"
                                        required
                                        type="radio" 
                                        id="banktransfer" 
                                        name="PaymentOption"
                                        v-model="inputs.payment_option"
                                        value="BankTransfer">
                                        <label for="banktransfer"> Bank Transfer</label> <br>
                                        
                                        <input type="radio" 
                                        class="mb-5"
                                        id="digitalwallet" 
                                        name="PaymentOption"
                                        v-model="inputs.payment_option"
                                        value="DigitalWallet">
                                        <label for="digitalwallet"> Digital Wallet</label><br>
                                        
                                        <input type="radio" 
                                        class="mb-5"
                                        id="qris" 
                                        name="PaymentOption"
                                        v-model="inputs.payment_option"
                                        value="QRIS">
                                        <label for="qris"> QRIS</label><br>
                                        
                                        <input type="radio" 
                                        class=""
                                        id="creditcard" 
                                        name="PaymentOption"
                                        v-model="inputs.payment_option"
                                        value="CreditCard">
                                        <label for="creditcard"> Credit Card</label><br>
                                    </div>
                                </div>
    
                                <div class="py-8 flex justify-center">
    
                                    <button
                                    type="submit"
                                    class="px-6 py-2 w-full border border-1 rounded-full bg-yellow-dark text-[#fdfdfd] font-medium"
                                    >
                                        Next
                                    </button>

                                </div>

                            </form>

                            
                        </div>
                        
                    </div>
                    
                    <!-- Order -->
                    <div v-show="paymentStep.order">
                        
                        <div class="m-2 inline-flex border border-b-2 rounded-md">
                            
                            <span  @click="goToPayment" 
                            class="text-xs px-2 cursor-pointer">
                                Back
                            </span>
                        
                        </div>

                        <div class="p-8">
    
                            <div class="pb-4 flex justify-between font-semibold border-b-2">
                                
                                <p>Order Details</p>

                            </div>
    
                            <div class="py-4 border-b-2">
                                
                                <div class="flex justify-between p-2 border-1 rounded-lg mb-3 shadow-md">
                                    <p>Order Review</p>
                                    <p>{{ cartObj.total_quantity }} items in cart</p>
                                </div>

                                <div class="flex justify-between p-2 border-1 rounded-lg shadow-md">
                                    <p>Total Price</p>
                                    <p v-text="rupiahFormat(cartObj.total_price)"></p>
                                </div>

                            </div>

                            <div class="py-8 flex justify-center">
                                
                                <button @click="handleSubmitFinal"
                                    class="px-6 py-2 w-full border border-1 rounded-full bg-yellow-dark text-[#fdfdfd] font-medium"
                                >
                                    Buy
                                </button>

                                <LoadingSpinner v-if="isPaymentCreated"/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </UserLayout>
</template>

<style scoped>
</style>