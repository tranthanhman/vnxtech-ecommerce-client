
import { Product } from "@/types/product"
import PageBreadcrumb from "@/components/shared/PageBreadcrumb"
import ProductInfo from "@/components/product/ProductInfo";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await api.get(process.env.NEXT_PUBLIC_API_URL + `/products/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <PageBreadcrumb />

      {/* Product Info */}
      <ProductInfo product={product} />
    </div>
  )
}
