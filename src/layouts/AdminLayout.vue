<template>
    <div class="font-poppins">
        <nav class="py-8 px-20 flex justify-between bg-blue-dark text-white">
            <div class="flex font-sora text-2xl"><h1>Gadget</h1><h1 class="text-red-500">Out</h1></div>
            <div>
                <p>admin_loggedin</p>
            </div>
        </nav>
        <slot></slot>
        <footer class="bg-blue-dark py-8 px-20 text-white flex justify-center">
            <p class="font-sora text-xs">Kelompok 3 Superbootcamp Nodejs (2024)</p>
        </footer>
    </div>
</template>