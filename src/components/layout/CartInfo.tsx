"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/stores/cartStore";

export default function CartInfo({ initState }: { initState: number }) {
    const { count, setCount } = useCartStore()
    useEffect(() => {
        if (count === 0) setCount(initState);
    }, [initState, count, setCount]);

    return (
        <Link href="/cart">
            <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center p-2 relative"
            >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="text-xs text-gray-600">Giỏ hàng</span>
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {count ?? 0}
                </Badge>
            </Button>
        </Link>
    )
}
