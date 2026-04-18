import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export function useBackend() {
  const { loginStatus, identity, isAuthenticated } = useInternetIdentity();
  const { setUser, setLoginStatus } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && identity) {
      const principal = identity.getPrincipal().toText();
      setUser(principal);
      setLoginStatus("logged-in");
    } else if (loginStatus === "idle") {
      setLoginStatus("logged-out");
    } else {
      setLoginStatus("initializing");
    }
  }, [loginStatus, identity, isAuthenticated, setUser, setLoginStatus]);

  return { loginStatus, identity, isAuthenticated };
}
