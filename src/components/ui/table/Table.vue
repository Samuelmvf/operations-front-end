<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
  containerClass: { type: null, required: false },
});
</script>

<template>
  <div
    data-slot="table-container"
    :class="cn('relative w-full overflow-auto', props.containerClass)"
  >
    <table data-slot="table" :class="cn('w-full caption-bottom', props.class)">
      <slot />
    </table>
  </div>
</template>
