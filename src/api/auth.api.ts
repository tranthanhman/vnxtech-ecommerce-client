import { api } from "../lib/api";

export const login = async (email: string, password: string) => {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    { email, password }
  )
  return res.data;
};

export const logout = async () => {
  await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {});
};
