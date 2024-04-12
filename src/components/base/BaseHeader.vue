<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Bars4Icon } from '@heroicons/vue/24/outline'
const toggleMenu = ref(false)
const route = useRoute()

watch(toggleMenu, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <header class="px-3 sm:px-6 py-4 flex items-center justify-between">
    <div class="sm:hidden">
      <button type="button" @click="toggleMenu = !toggleMenu">
        <Bars4Icon class="w-6 h-6 text-white" />
      </button>
    </div>
    <div>
      <router-link to="/">
        <img src="@/assets/img/logo.svg" alt="Logo BigBang" />
      </router-link>
    </div>

    <nav
      class="z-50 flex top-0 left-0 absolute sm:relative sm:space-x-6 transform transition-transform duration-300 ease-in-out flex-col py-6 px-3 bg-[#7986FE] w-3/4 h-full sm:bg-transparent sm:w-auto sm:h-auto sm:px-0 sm:py-0 sm:flex-row"
      :class="[
        {
          '-translate-x-[200%] sm:translate-x-0': !toggleMenu
        }
      ]"
    >
      <button
        type="button"
        @click="toggleMenu = false"
        class="sm:hidden absolute top-3 right-3 z-50"
      >
        <img src="@/assets/img/icons/close.svg" alt="Fechar menu" width="15" height="15" />
      </button>
      <router-link to="/" class="sm:hidden mb-4">
        <img src="@/assets/img/logo.svg" alt="Logo BigBang" />
      </router-link>
      <router-link
        class="px-5 py-2 font-medium text-base hover:bg-[#FF6969] text-white"
        to="/"
        :class="{ 'bg-[#FF6969]': route.path === '/' }"
        >Dashboard</router-link
      >
      <router-link
        class="px-5 py-2 font-medium text-base hover:bg-[#FF6969] text-white"
        to="/payments"
        :class="{ 'bg-[#FF6969]': route.path === '/payments' }"
        >Pagamentos</router-link
      >
      <router-link
        class="px-5 py-2 font-medium text-base hover:bg-[#FF6969] text-white"
        to="/invoices"
        :class="{ 'bg-[#FF6969]': route.path === '/invoices' }"
        >Invoices</router-link
      >
      <router-link
        class="px-5 py-2 font-medium text-base hover:bg-[#FF6969] text-white"
        to="/insights"
        :class="{ 'bg-[#FF6969]': route.path === '/insights' }"
        >Insights</router-link
      >
    </nav>
    <div>
      <img src="@/assets/img/icons/notification.svg" alt="Notificações" />
    </div>

    <div
      :class="{ 'hidden ': !toggleMenu }"
      @click.self="toggleMenu = false"
      class="sm:hidden w-full h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center md:inset-0 max-h-full flex bg-black bg-opacity-50"
    />
  </header>
</template>
