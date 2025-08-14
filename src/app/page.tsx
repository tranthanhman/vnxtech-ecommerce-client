import { HeroBanner } from "../components/home/hero-banner"
import { SectionCategories } from "../components/home/SectionCategories"
import { FeaturedProducts } from "../components/home/featured-products"
import { PromotionalBanners } from "../components/home/promotional-banners"
import { NewsSection } from "../components/home/news-section"
import { api } from "@/lib/api"

export default async function HomePage() {
  const categories = await api.get(process.env.NEXT_PUBLIC_API_URL + "/category")
  return (
    <div>
      <HeroBanner />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 space-y-12 py-8">
          <SectionCategories data={categories?.data} />
          <FeaturedProducts />
          <PromotionalBanners />
          <NewsSection />
        </div>
      </div>
    </div>
  )
}
