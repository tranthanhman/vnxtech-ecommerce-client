import { api } from "../lib/api";

export const getMe = async () => {
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
    {
      credentials:"include"
    }
  );
  return res.data;
};
