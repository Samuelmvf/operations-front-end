<script setup>
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  orientation: { type: String, required: false, default: "vertical" },
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-off-white/5',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-off-white/5',
        props.class
      )
    "
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="bg-gray-neutral relative flex-1 rounded-full"
    />
  </ScrollAreaScrollbar>
</template>
