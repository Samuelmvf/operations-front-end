<script setup>
import { reactiveOmit } from "@vueuse/core";
import { AlertDialogTitle } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="delegatedProps"
    :class="cn('text-base font-bold text-white leading-none', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
