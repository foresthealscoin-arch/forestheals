import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  principal: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loginStatus: "logged-in" | "logged-out" | "initializing";
  setUser: (principal: string) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoginStatus: (status: "logged-in" | "logged-out" | "initializing") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      principal: null,
      isLoggedIn: false,
      isAdmin: false,
      loginStatus: "initializing",

      setUser: (principal) =>
        set({ principal, isLoggedIn: true, loginStatus: "logged-in" }),

      setAdmin: (isAdmin) => set({ isAdmin }),

      setLoginStatus: (status) =>
        set({
          loginStatus: status,
          isLoggedIn: status === "logged-in",
          ...(status === "logged-out"
            ? { principal: null, isAdmin: false }
            : {}),
        }),

      logout: () =>
        set({
          principal: null,
          isLoggedIn: false,
          isAdmin: false,
          loginStatus: "logged-out",
        }),
    }),
    {
      name: "forestheals-auth",
      partialize: (state) => ({
        principal: state.principal,
        isAdmin: state.isAdmin,
      }),
    },
  ),
);
