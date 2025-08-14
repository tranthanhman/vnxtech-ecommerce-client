import { Product } from "./product";

export interface ICartItem {
  id: number;
  productId: number;
  variantId?: number;
  quantity: number;
  product: Product;
}
