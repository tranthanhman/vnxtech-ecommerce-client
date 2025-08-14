"use client";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Product } from "../../types/product";
import { useAuthStore } from "../../stores/authStore";
import { api } from "../../lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner"
import { useCartStore } from "@/stores/cartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductQuantityControl({ product }: { product: Product }) {
    const { data: user } = useAuth()
    const { openAuthModal } = useAuthStore()
    const { setCount } = useCartStore()
    const queryClient = useQueryClient()

    // Define the mutation outside the callback, as required by React Query
    const addToCartMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                productId: product.id,
                quantity: 1
            };
            const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, payload);
            if (response?.success) {
                toast.success("Add success");
                const { total } = response?.data;
                setCount(total);
            }
            return response;
        },
        onSuccess: () => {
            // ✅ Trigger refetch giỏ hàng
            queryClient.invalidateQueries({ queryKey: ["cart-items"] });
        },
        onError: (error) => {
            // handle error, e.g. show error notification
            console.error('Error adding to cart:', error);
            toast.error("Có lỗi khi thêm vào giỏ hàng");
        }
    });

    const handleAddToCart = useCallback(() => {
        if (!user) {
            openAuthModal();
            return;
        }
        addToCartMutation.mutate();
    }, [user, openAuthModal, addToCartMutation]);

    return (
        <>
            {/* Actions */}
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <Button onClick={handleAddToCart} className="flex-1 bg-red-600 hover:bg-red-700 h-12">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Thêm vào giỏ hàng
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
                <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700">Mua ngay</Button>
            </div>
        </>
    )
}
