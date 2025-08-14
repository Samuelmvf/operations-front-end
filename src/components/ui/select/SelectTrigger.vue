<script setup>
import { reactiveOmit } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  disabled: { type: Boolean, required: false },
  reference: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  size: { type: String, required: false, default: "default" },
});

const delegatedProps = reactiveOmit(props, "class", "size");
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="
      cn(
        `border-input bg-background text-black data-[placeholder]:text-gray-600 [&_svg:not([class*='text-'])]:text-gray-600 focus-visible:border-indigo-medium focus-visible:ring-indigo-medium/20 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 flex w-fit items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-sm transition-[color,box-shadow,border-color] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-indigo-light data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        props.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 text-gray-600" />
    </SelectIcon>
  </SelectTrigger>
</template>
