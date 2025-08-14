"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"
import { api } from "../../lib/api"
import CartItem from "./CartItem"
import { ICartItem } from "@/types/cart"
import CartSummary from "./CartSummary"
import { useQuery } from "@tanstack/react-query"

export function CartPage() {
  const { isPending, error, data: cartItems } = useQuery<ICartItem[]>({
    queryKey: ['cart-items'],
    queryFn: () =>
      api.get(process.env.NEXT_PUBLIC_API_URL + '/cart', {
        credentials: "include"
      }).then((res) => res.data),
    refetchOnWindowFocus: true, // khi tab được focus lại
    refetchOnMount: true,       // khi component mount lại
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const subtotal = cartItems.reduce((sum, item) => sum + item?.product?.price * item?.quantity, 0)
  const shipping = subtotal > 1000000 ? 0 : 50000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 && cartItems.map((item) => (
            <CartItem key={item.productId} data={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
