<script setup>
import UserLayout from "../../../layouts/UserLayout.vue";
import CartItems from "../../../components/Cart/CartItems.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPaymentPage = async () => {
  router.push('/payment')
}

</script>

<template>
  <UserLayout>
    <div class="p-8 font-sora">
      <!-- placeholder breadcrumbs -->
      <div>
        <span>Home ></span>
        <span>Cart</span>
      </div>

      <div class="w-full flex justify-between flex-wrap gap-4 xl:gap-0">
        <div class="w-full xl:w-[68.75%]">
          <div>
            <div
              class="p-4 hidden lg:flex lg:gap-2 w-full font-semibold text-[#232323] bg-blue-light"
            >
              <h6 class="w-4/12">Product</h6>
              <h6 class="w-2/12">Price</h6>
              <h6 class="w-2/12">Quantity</h6>
              <h6 class="w-2/12">Subtotal</h6>
            </div>

            <CartItems />
            <CartItems />
            <CartItems />
            <CartItems />
            <CartItems />
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

        <div class="w-full max-h-[30rem] xl:w-[30%] border border-1">
          <div
            class="p-4 flex justify-center font-semibold text-[#232323] bg-blue-light"
          >
            <h6>Cart Total</h6>
          </div>

          <div class="p-8">
            <div class="pb-4 flex justify-between font-semibold border-b-2">
              <p>Subtotal</p>
              <p>Rp 2.000.000</p>
            </div>
            <div class="py-8 flex justify-between border-b-2">
              <div
                class="px-4 py-2 w-full flex justify-between border border-1 rounded-2xl"
              >
                <input
                  id="coupon"
                  type="text"
                  placeholder="Enter coupon code"
                  class="focus:outline-none w-10/12"
                />
                <button class="text-blue-dark text-sm font-semibold">
                  Apply
                </button>
              </div>
            </div>
            <div class="py-8 flex justify-between">
              <div
                class="px-4 py-2 w-full flex justify-between border border-1nded-2xl"
              >
                <input
                  id="coupon"
                  type="text"
                  placeholder="Placeholder input"
                  class="focus:outline-none w-full"
                />
              </div>
            </div>
            <div class="flex justify-between">
              <p>Total amount</p>
              <p class="font-semibold">Rp 1.000.000</p>
            </div>
            <div class="py-8 flex justify-center">
              <button
                @click="goToPaymentPage"
                class="px-6 py-2 w-full border border-1 rounded-full bg-yellow-dark text-[#fdfdfd] font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
