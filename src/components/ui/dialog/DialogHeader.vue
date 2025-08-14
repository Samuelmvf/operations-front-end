<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="
      cn(
        'bg-gray-medium h-[2.75rem] rounded-t-2xl flex flex-row items-center gap-2 text-center px-4 justify-between',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
