<template>

    <UserLayout>
        <div class="p-8 font-sora">
            <!-- placeholder breadcrumbs -->
            <div>
                <span>Home ></span>
                <span>Wishlist</span>
            </div>

            <div class="w-full flex justify-between flex-wrap gap-4 xl:gap-0">
                <div class="w-full xl:w-[100%]">

                    <div>
                        <div
                        class="p-4 hidden lg:flex lg:gap-2 w-full justify-between 
                        font-semibold text-[#232323] bg-blue-light"
                        >
                        <h6 class="w-4/12">Product</h6>
                        <h6 class="w-2/12">Price</h6>
                        <h6 class="w-2/12">Quantity</h6>
                        </div>
                    </div>

                    <div class="my-4 w-full flex justify-center">
                        <div class="w-4/12 flex justify-center">
                            <button
                                class="px-6 py-2 border border-1 rounded-full bg-yellow-dark text-[#fdfdfd] font-medium"
                            >
                                Continue Shopping
                            </button>
                            </div>
                            <div class="w-4/12 flex justify-center">
                            <button
                                class="px-6 py-2 border border-1 rounded-full font-medium"
                            >
                                Update Cart
                            </button>
                            </div>
                            <div class="w-4/12 flex justify-center">
                            <button
                                class="px-6 py-2 border border-1 border-red-500 rounded-full text-red-500 font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </UserLayout>

</template>

<script setup>
import UserLayout from "../../../layouts/UserLayout.vue";

</script>
