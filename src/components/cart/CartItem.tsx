"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import type { ICartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { formatPrice } from "@/utils/format-price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";

export default function CartItem({ data }: { data: ICartItem }) {
    const queryClient = useQueryClient();
    const { setCount } = useCartStore()

    const deleteCartItemMutation = useMutation({
        mutationFn: async () => {
            const response = await api.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${data.id}`, {
                credentials: "include"
            });

            return response;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
                setCount(response?.data)
                queryClient.invalidateQueries({ queryKey: ["cart-items"] });
            }
        },
        onError: () => {
            toast.error("Có lỗi khi xóa sản phẩm khỏi giỏ hàng");
        },
    });

    const handleDelete = () => {
        deleteCartItemMutation.mutate();
    };

    return (
        <Card key={data.productId + (data.variantId ? '-' + data.variantId : '')}>
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                            src={data.product?.thumbnail?.url || "/placeholder.svg"}
                            alt={data?.product?.name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{data?.product?.name}</h3>
                                {/* <div className="text-sm text-gray-600 space-x-2">
                <span>Màu: {item.color}</span>
                <span>•</span>
                <span>{item.variant}</span>
              </div> */}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="text-lg font-bold text-red-600">{formatPrice(data?.product?.price)}</div>
                                {data?.product?.discountPrice && data?.product?.discountPrice > data?.product?.price && (
                                    <div className="text-sm text-gray-500 line-through">{formatPrice(data?.product?.discountPrice)}</div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-8 w-8"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{data.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-8 w-8"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
