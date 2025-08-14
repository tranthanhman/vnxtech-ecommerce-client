import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductListResponse } from "@/types/product"
import { api } from "@/lib/api"

async function getFeaturedProducts(): Promise<ProductListResponse> {
  const res = await api.get(process.env.NEXT_PUBLIC_API_URL + "/products?limit=12", {
    cache: "no-store",
  })
  return res.data
}

export async function FeaturedProducts() {
  const data = await getFeaturedProducts()
  const { products } = data

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
        <Link href="/products">
          <Button variant="outline">Xem tất cả</Button>
        </Link>
      </div>

      {products?.length === 0 ? (
        <div>Không có sản phẩm nổi bật.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
