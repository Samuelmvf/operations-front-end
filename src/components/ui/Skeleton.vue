<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-muted', props.class)" />
</template>

<style scoped>
.bg-muted {
  background-color: oklch(0.97 0 0);
}
</style>
