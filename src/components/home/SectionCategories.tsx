import Link from "next/link"
// import { Phone, Laptop, Tablet, Headphones, Watch, Camera, Gamepad2, Tv } from "lucide-react"
import { Category } from "@/types/category"
import { TPagination } from "@/types/pagination"

type Props = {
  categories: Category[]
  pagination: TPagination
}

export function SectionCategories({ data }: { data: Props }) {
  const { categories } = data

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories && categories?.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.slug}`}
            className="flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition-shadow group"
          >
            {category.icon && (
              <div className="p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <category.icon />
              </div>
            )}
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
