<script setup>
import logo from "@/assets/operators/operators-128.png";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header
    class="w-full flex justify-center border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70"
  >
    <div class="px-6 w-full max-w-[87.5rem] flex items-center justify-between h-14">
      <div class="flex items-center">
        <img :src="logo" alt="logo" class="w-10 h-10" />
        <span class="text-black-medium text-2xl font-bold pl-2"> Operations </span>
        <span class="text-gray-medium text-1xl font-normal ml-[-4.3rem] pt-[2rem]"
          >Software</span
        >
      </div>

      <div class="flex items-center gap-6">
        <span class="text-black/80">Balance: {{ authStore.currentUser.balance }}</span>
        <span class="user-profile__text text-black/80">{{
          authStore.currentUser.username
        }}</span>
        <button
          class="text-sm text-black/80 hover:text-red-medium transition-colors cursor-pointer"
          @click="$emit('signOut')"
        >
          Sign out
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.user-profile__text {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  display: none;

  @media (min-width: 890px) {
    display: block;
  }
}
</style>
