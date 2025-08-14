<script setup>
import { ref, onMounted } from "vue";
import Skeleton from "./Skeleton.vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Image",
  },
  imgClass: {
    type: String,
    default: "",
  },
  skeletonClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["load", "error"]);

const isLoading = ref(true);
const hasError = ref(false);
const imageRef = ref(null);

const handleLoad = () => {
  isLoading.value = false;
  emit("load");
};

const handleError = () => {
  isLoading.value = false;
  hasError.value = true;
  emit("error");
};

onMounted(() => {
  if (imageRef.value?.complete) {
    handleLoad();
  }
});
</script>

<template>
  <div class="relative">
    <!-- Skeleton loader -->
    <Skeleton v-if="isLoading" :class="skeletonClass || imgClass" class="absolute inset-0" />

    <!-- Actual image -->
    <img
      ref="imageRef"
      :src="src"
      :alt="alt"
      :class="imgClass"
      :style="{ opacity: isLoading ? 0 : 1 }"
      class="transition-opacity duration-200"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- Error state (optional) -->
    <div
      v-if="hasError && !isLoading"
      :class="imgClass"
      class="flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
    >
      Failed to load
    </div>
  </div>
</template>
