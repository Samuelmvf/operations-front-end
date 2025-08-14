<script setup>
import { useTemplateRef, provide } from "vue";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

import ModalConfirmation from "@/components/ui/modal/confirmation/ModalConfirmation.vue";

const modalConfirmationRef = useTemplateRef("modal-confirmation");

const modalConfirmation = async (options) => {
  if (!modalConfirmationRef.value) {
    console.error("Modal confirmation not available");
    return false;
  }
  return await modalConfirmationRef.value.openModal(options);
};

provide("modalConfirmation", modalConfirmation);
</script>

<template>
  <main>
    <Toaster position="top-center" richColors />
    <ModalConfirmation ref="modal-confirmation" />

    <router-view />
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
</style>
