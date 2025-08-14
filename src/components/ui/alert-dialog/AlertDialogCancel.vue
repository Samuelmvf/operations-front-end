<script setup>
import { reactiveOmit } from "@vueuse/core";
import { AlertDialogCancel } from "reka-ui";
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  variant: { type: String, required: false, default: "outline" },
  size: { type: String, required: false, default: "sm" },
});

const delegatedProps = reactiveOmit(props, "class", "variant", "size");
</script>

<template>
  <AlertDialogCancel as-child v-bind="delegatedProps">
    <Button :variant="variant" :size="size" :class="['mt-2 sm:mt-0', props.class]">
      <slot />
    </Button>
  </AlertDialogCancel>
</template>
