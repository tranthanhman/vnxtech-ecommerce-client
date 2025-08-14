import { HeroBanner } from "../components/home/hero-banner"
import { SectionCategories } from "../components/home/SectionCategories"
import { FeaturedProducts } from "../components/home/featured-products"
import { PromotionalBanners } from "../components/home/promotional-banners"
import { NewsSection } from "../components/home/news-section"
import { api } from "@/lib/api"

export default async function HomePage() {
  let categories = null;
  try {
    categories = await api.get(process.env.NEXT_PUBLIC_API_URL + "/category")
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories = { data: [] }; // Fallback data
  }
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
