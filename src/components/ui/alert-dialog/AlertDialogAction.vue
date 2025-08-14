<script setup>
import { reactiveOmit } from "@vueuse/core";
import { AlertDialogAction } from "reka-ui";
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  variant: { type: String, required: false, default: "confirm" },
  size: { type: String, required: false, default: "sm" },
});

const delegatedProps = reactiveOmit(props, "class", "variant", "size");
</script>

<template>
  <AlertDialogAction as-child v-bind="delegatedProps">
    <Button :variant="variant" :size="size" :class="props.class">
      <slot />
    </Button>
  </AlertDialogAction>
</template>
