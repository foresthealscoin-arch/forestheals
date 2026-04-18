import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuth() {
  const {
    login: iiLogin,
    clear: iiLogout,
    loginStatus,
    identity,
    isAuthenticated,
    isInitializing,
  } = useInternetIdentity();
  const {
    principal,
    isLoggedIn,
    isAdmin,
    logout: storeLogout,
  } = useAuthStore();

  const login = useCallback(async () => {
    try {
      iiLogin();
    } catch (err) {
      console.error("Login failed:", err);
    }
  }, [iiLogin]);

  const logout = useCallback(async () => {
    try {
      iiLogout();
      storeLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [iiLogout, storeLogout]);

  return {
    login,
    logout,
    loginStatus,
    isAuthenticated,
    isInitializing,
    identity,
    principal,
    isLoggedIn,
    isAdmin,
  };
}
