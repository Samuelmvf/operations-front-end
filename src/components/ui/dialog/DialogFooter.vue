<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div data-slot="dialog-footer" :class="cn('flex flex-row items-center justify-center gap-2', props.class)">
    <slot />
  </div>
</template>
