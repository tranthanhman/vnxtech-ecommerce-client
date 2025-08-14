"use client"

import { api } from "@/lib/api";
import OrderHistory from "@/components/account/OrderHistory";
import { useQuery } from "@tanstack/react-query";

export default function AccountOrder() {
    const { isPending, error, data } = useQuery({
        queryKey: ['order-history'],
        queryFn: () =>
            api.get(process.env.NEXT_PUBLIC_API_URL + "/order/history", {
                credentials: 'include',
            }).then((res) => res.data)
    });

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message


    return (
        <OrderHistory orders={data?.orders} />
    )
}