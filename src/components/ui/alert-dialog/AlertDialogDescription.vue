<script setup>
import { reactiveOmit } from "@vueuse/core";
import { AlertDialogDescription } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="delegatedProps"
    :class="cn('text-sm text-black px-4 py-4', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
