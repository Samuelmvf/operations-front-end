import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import { toast } from "vue-sonner";

import routes, { LOGIN_ROUTE } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const setDocumentTitle = (route) => {
  document.title = route.meta?.title || "Operations";
};

const getAuthConfig = (route) => ({
  requiresAuth: route.meta?.auth?.required || false,
});

const authGuard = async (to, _from, next) => {
  setDocumentTitle(to);

  const authStore = useAuthStore();
  const { requiresAuth } = getAuthConfig(to);

  if (!requiresAuth) {
    return next();
  }

  if (!authStore.isAuthenticated) {
    const { error } = await authStore.initializeAuth();

    if (error) {
      toast.error(error);
      return next(LOGIN_ROUTE);
    }
  }

  next();
};

router.beforeEach(authGuard);

export default router;
