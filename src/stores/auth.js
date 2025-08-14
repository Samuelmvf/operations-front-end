import { defineStore } from "pinia";

import { authRepository } from "@/repositories";
import { LOGIN_ROUTE } from "@/router/routes";

export const TOKEN_KEYS = {
  REFRESH_TOKEN: "operations_refresh_token",
  ACCESS_TOKEN: "operations_access_token",
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    accessToken: () => sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN),
    refreshToken: () => localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN),
  },

  actions: {
    setCurrentUser(user) {
      this.currentUser = user;

      if (user.refreshToken) {
        this.setStorageTokens(user);
      }
    },

    setStorageTokens({ accessToken, refreshToken }) {
      sessionStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    },

    async initializeAuth() {
      this.isLoading = true;

      const storedRefreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);

      if (!storedRefreshToken) {
        this.isLoading = false;
        return { error: "No refresh token found" };
      }

      const { data, error } = await authRepository.refreshToken({
        refreshToken: storedRefreshToken,
      });

      if (error) {
        sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);

        this.isLoading = false;
        return { error: error || "Failed to refresh session" };
      }

      this.setCurrentUser(data);
      this.isLoading = false;

      return { currentUser: data };
    },

    async logout({ skipRedirect = false }) {
      this.currentUser = null;

      sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);

      if (!skipRedirect) {
        window.location.href = LOGIN_ROUTE;
      }
    },
  },
});
