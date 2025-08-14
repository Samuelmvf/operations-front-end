<script setup>
import { cn } from '@/lib/utils'
</script>

<template>
  <h1 :class="cn('text-2xl font-bold', $attrs.class)" v-bind="$attrs">
    <slot />
  </h1>
</template>