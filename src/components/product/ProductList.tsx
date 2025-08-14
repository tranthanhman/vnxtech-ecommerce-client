"use client"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Product } from "@/types/product"
import { formatPrice } from "@/utils/format-price"
import { TPagination } from "@/types/pagination"
import { useState } from "react"

type Props = {
  products: Product[]
  pagination: TPagination
}

export default function ProductList({ data }: { data: Props }) {
  const { products } = data
  const [viewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex-1">
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {products && products?.map((product: Product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className={`p-4 ${viewMode === "list" ? "flex space-x-4" : ""}`}>
              <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "mb-4"}`}>
                <Link href={`/${product.slug}`}>
                  <Image
                    src={product.thumbnail?.url || "/placeholder.svg"}
                    alt={product.name}
                    width={250}
                    height={250}
                    className={`object-cover rounded-lg group-hover:scale-105 transition-transform 
                      ${viewMode === "list" ? "w-full h-32" : "w-full h-48"}`
                    }
                  />
                </Link>
              </div>

              <div className="flex-1 space-y-2">
                <Link href={`/${product?.slug}`}>
                  <h3 className="font-semibold line-clamp-2 hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="space-y-1">
                  <div className="text-lg font-bold text-red-600">{formatPrice(product.price)}</div>
                  {product?.discountPrice && product.discountPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">{formatPrice(product.discountPrice)}</div>
                  )}
                </div>

                <div className={`flex space-x-2 pt-2 ${viewMode === "list" ? "flex-col space-y-2 space-x-0" : ""}`}>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={product.stock <= 0}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock > 0 ? "Mua ngay" : "Hết hàng"}
                  </Button>
                  <Button variant="outline" size="icon">
                    ♡
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination dummy (chưa dynamic) */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
