<script setup>
import { ref, watch } from "vue";

let quantity = ref(1);

watch(quantity, (newVal, oldVal) => {
  if (newVal < 0) {
    quantity.value = 1;
  } else if (newVal > 100) {
    quantity.value = 100;
  }
});

const decreaseQuantity = () => {
  quantity.value -= 1;
  if (quantity.value < 1) {
    quantity.value = 1;
  }
};

const increaseQuantity = () => {
  quantity.value += 1;
};
</script>

<template>
  <div
    class="px-4 py-4 w-full flex flex-wrap xl:flex-nowrap items-center sm:items-start gap-2 border-b-2"
  >
    <div class="sm:w-7/12 lg:w-4/12 w-full flex gap-4 order-1 md:order-1">
      <img
        src="https://source.unsplash.com/random"
        alt=""
        class="aspect-square object-cover w-24 h-24 rounded-lg"
      />
      <div>
        <p class="hidden sm:block lg:hidden text-sm text-stone-500 uppercase">
          Product
        </p>
        <p
          class="text-blue-dark text-ellipsis hover:truncate text-nowrap hover:text-wrap overflow-hidden hover:overflow-auto w-[15rem] sm:w-[10rem] md:w-[15rem] lg:w-[10rem]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          aperiam.
        </p>
        <p class="block sm:hidden font-semibold">Rp1.000.000</p>
        <p class="hidden sm:block text-sm text-stone-500">stock: {{ "10" }}</p>
        <p class="text-sm text-stone-500">{{ "Category" }}</p>
      </div>
    </div>
    <div
      class="w-4/12 lg:w-2/12 sm:flex sm:items-center sm:gap-2 order-4 md:order-3"
    >
      <p class="hidden sm:block lg:hidden text-sm text-stone-500 uppercase">
        Qty
      </p>

      <div class="w-fit h-fit border border-1 border-stone-400 rounded">
        <button class="px-2" @click="decreaseQuantity">-</button>
        <input
          v-model="quantity"
          class="w-[2.5rem] py-2 text-center"
          type="number"
          name="quantity"
          id="quantity"
        />
        <button class="px-2" @click="increaseQuantity">+</button>
      </div>
    </div>
    <div class="sm:w-3/12 lg:w-2/12 hidden sm:block order-2 md:order-2">
      <p class="hidden sm:block lg:hidden text-sm text-stone-500 uppercase">
        Subtotal
      </p>
      <p class="font-semibold">Rp 2.000.000</p>
      <p class="text-sm text-stone-500">Rp 1.000.000 each</p>
    </div>
    <div class="w-7/12 lg:w-2/12 hidden lg:block order-3 md:order-4">
      <p class="font-semibold">Rp 2.000.000</p>
    </div>

    <div class="order-5 flex gap-2">
      <button
        class="h-fit p-2 rounded-full border border-1 border-stone-400 hover:border-green-500 hover:border-2"
      >
        WL
      </button>
      <button
        class="h-fit py-2 px-4 rounded-full border border-1 border-stone-400 hover:text-red-500 hover:border-red-500 hover:border-2"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
