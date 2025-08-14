<script setup>
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-off-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        destructive:
          "text-white bg-gradient-to-r from-red-light to-red-dark hover:from-red-light/90 hover:to-red-dark/90",
        warning:
          "text-black bg-gradient-to-r from-yellow-light to-yellow-medium hover:from-yellow-light/90 hover:to-yellow-medium/90",
        confirm:
          "text-white bg-gradient-to-r from-green-light to-green-medium hover:from-green-light/90 hover:to-green-medium/90",
        primary:
          "text-white bg-gradient-to-r from-blue-light to-blue-medium hover:from-blue-light/90 hover:to-blue-medium/90",
        secondary: "text-gray-medium bg-off-white hover:bg-gray-100",
      },
      size: {
        sm: "h-9 px-4",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
  }
);

const props = defineProps({
  variant: {
    type: String,
    default: "outline",
  },
  size: {
    type: String,
    default: "sm",
  },
  as: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </component>
</template>
