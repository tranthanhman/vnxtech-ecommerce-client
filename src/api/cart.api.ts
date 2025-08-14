import { cookies } from "next/headers";
import { api } from "../lib/api";

export const cartCount = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore?.toString();

  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/count`, {
    headers: {
      Cookie: cookieString,
    },
  });

  return res;
};