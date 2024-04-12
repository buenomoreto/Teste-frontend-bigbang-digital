<script setup lang="ts">
const { color, value } = defineProps(['color', 'value'])
</script>

<template>
  <div class="w-full bg-[#D9D9D9] rounded-sm h-2">
    <div :class="`h-2 rounded-full`" :style="[{ width: `${value}%` }, { background: color }]"></div>
  </div>
</template>
