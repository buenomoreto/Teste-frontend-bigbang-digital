<script setup lang="ts"></script>
<template>
  <div
    class="max-w-[400px] sm:max-w-[350px] w-full flex flex-col min-h-[210px] justify-between p-5 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.3)] bg-white hover:scale-110 transform transition-transform duration-300 ease-in-out"
  >
    <slot name="title"> </slot>
    <slot name="price"> </slot>
    <slot name="action"> </slot>
  </div>
</template>
