<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <thead data-slot="table-header" :class="cn('bg-indigo-medium rounded-md', props.class)">
    <slot />
  </thead>
</template>
