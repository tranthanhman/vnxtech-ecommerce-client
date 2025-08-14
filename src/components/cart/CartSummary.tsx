import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/utils/format-price";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Link from "next/link";

interface Props {
  subtotal: number,
  total: number,
  shipping: number
}

export default function CartSummary(data: Props) {
  const { total, subtotal, shipping } = data
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Tóm tắt đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span>{shipping === 0 ? <Badge variant="secondary">Miễn phí</Badge> : formatPrice(shipping)}</span>
          </div>
          {shipping === 0 && <div className="text-sm text-green-600">🎉 Bạn được miễn phí vận chuyển!</div>}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Tổng cộng:</span>
          <span className="text-red-600">{formatPrice(total)}</span>
        </div>

        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/checkout">Tiến hành thanh toán</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Tiếp tục mua sắm</Link>
          </Button>
        </div>

        {/* Promotions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Ưu đãi đặc biệt</h4>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Miễn phí vận chuyển cho đơn hàng từ 1 triệu</li>
            <li>• Bảo hành chính hãng 12 tháng</li>
            <li>• Đổi trả trong 7 ngày</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
