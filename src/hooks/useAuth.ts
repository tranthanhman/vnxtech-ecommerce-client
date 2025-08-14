import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/api/user.api";
import { login as loginApi, logout as logoutApi } from "@/api/auth.api";
import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)
  const clearUser = useAuthStore((s) => s.clearUser)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const loginCallback = useCallback(
    async (email: string, password: string) => {
      try {
        const { user } = await loginApi(email, password);
        setUser(user)
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [setUser]
  );

  const logoutCallback = useCallback(
    async () => {
      try {
        await logoutApi();
        clearUser()
        queryClient.removeQueries({ queryKey: ['me'] })
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    },
    [clearUser, queryClient]
  );

  const result = useMemo(() => ({
    ...query,
    login: loginCallback,
    logout: logoutCallback,
  }), [loginCallback, logoutCallback, query]);

  return result;
};