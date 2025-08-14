<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>

      <p class="text-xl text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>

      <div class="space-x-4">
        <button @click="goBack" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
