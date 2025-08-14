<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <td
    data-slot="table-cell"
    :class="cn('px-4 py-2 align-middle whitespace-nowrap text-base', props.class)"
  >
    <slot />
  </td>
</template>
