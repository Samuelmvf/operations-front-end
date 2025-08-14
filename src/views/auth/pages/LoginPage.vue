<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/stores/auth";

import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";

import { authRepository } from "@/repositories";
import { OPERATIONS_ROUTE } from "@/router/routes";

import OperationsLogo from "@/assets/operators/operators-128.png";
import LoadingSvg from "@/components/ui/svg/LoadingSvg.vue";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    toast.error("Please enter your email and password");
    return;
  }

  isLoading.value = true;

  const { data, error } = await authRepository.login({
    username: email.value,
    password: password.value,
  });

  if (error) {
    toast.error(error);
    isLoading.value = false;
    return;
  }

  authStore.setCurrentUser(data);
  router.push(OPERATIONS_ROUTE);

  isLoading.value = false;
};
</script>

<template>
  <section
    aria-label="Login Form"
    class="min-h-screen bg-gradient-to-b from-off-white to-indigo-light flex items-center justify-center"
  >
    <div class="w-md flex flex-col">
      <div class="text-center mb-8 flex flex-col items-center gap-4">
        <img :src="OperationsLogo" alt="Operations" class="w-16 h-16" />
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-bold text-gray-dark">Operations</h1>
          <p class="text-gray-neutral text-sm">Platform</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-dark mb-2">Welcome</h2>
          <p class="text-gray-neutral">Sign in to access the system</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-dark">Email</label>
            <Input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full transition-all duration-200 focus:ring-green-medium focus:border-green-medium"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-dark">
              Password
            </label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
              class="w-full transition-all duration-200 focus:ring-green-medium focus:border-green-medium"
            />
          </div>

          <Button
            type="submit"
            variant="confirm"
            size="lg"
            class="w-full mt-8 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.25"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <LoadingSvg />
              Signing in...
            </span>
          </Button>
        </form>
      </div>

      <div class="text-center text-xs text-gray-neutral mt-8">
        <p>&copy; 2025 Operations. All rights reserved.</p>
      </div>
    </div>
  </section>
</template>
