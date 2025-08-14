<script setup>
import { useRouter } from "vue-router";
import { authRepository } from "@/repositories";
import Header from "@/components/ui/Header.vue";

const router = useRouter();

const handleSignOut = async () => {
  try {
    await authRepository.logout();
  } finally {
    router.push("/login");
  }
};
</script>

<template>
  <Header @signOut="handleSignOut" />

  <section class="w-full mx-auto p-5 max-w-[87.5rem]">
    <router-view />
  </section>
</template>
