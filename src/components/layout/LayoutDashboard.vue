<script setup lang="ts">
import BaseHeader from '../base/BaseHeader.vue'
import { useEstablishment } from '@/stores/establishment'
import { onBeforeMount } from 'vue'
const { fetchEstablishment } = useEstablishment()

onBeforeMount(async () => {
  await fetchEstablishment()
})
</script>
<template>
  <main class="relative min-h-screen">
    <BaseHeader />
    <section>
      <slot />
    </section>
    <div class="absolute top-0 bg-[#292D32] w-full h-1/2 z-[-1]" />
  </main>
</template>
@/stores/establishment
