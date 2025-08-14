<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <tbody data-slot="table-body" :class="cn('', props.class)">
    <slot />
  </tbody>
</template>
