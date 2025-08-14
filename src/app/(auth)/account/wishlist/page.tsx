import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";

const wishlistItems = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    price: 32990000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: 'iPad Pro 11" M4',
    price: 24990000,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Wishlist() {
  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Chưa có sản phẩm yêu thích</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Khám phá sản phẩm</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex space-x-4 p-4 border rounded-lg">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{item.name}</h4>
                <p className="text-red-600 font-bold mb-3">{formatPrice(item.price)}</p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Mua ngay
                  </Button>
                  <Button variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
