<script setup lang="ts"></script>
<template>
  <div
    @click.self="$emit('cancel')"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center h-full w-full md:inset-0 max-h-full flex bg-black bg-opacity-50"
  >
    <!-- Modal content -->
    <div
      class="relative rounded-sm shadow bg-[#292D32] w-full sm:max-w-md max-h-full max-w-xs sm:mt-0 mt-14"
    >
      <!-- Modal header -->
      <div class="flex items-center justify-between p-3 border-b rounded-t">
        <h3 class="text-lg font-semibold text-white">
          <slot name="title"></slot>
        </h3>
        <button
          type="button"
          @click="$emit('cancel')"
          class="text-gray-400 bg-transparent hover:bg-[#473eed] hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <img width="16" height="16" src="@/assets/img/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
      <!-- Modal body -->
      <form class="p-4 md:p-5">
        <slot name="body"> </slot>
        <slot name="action"> </slot>
      </form>
    </div>
  </div>
</template>
