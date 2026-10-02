import { PRODUCT_CATEGORY, type Product } from "./products";

export interface XPixelContent {
  content_id: string;
  content_name: string;
  content_price: number;
  content_type: string;
  num_items: number;
}

export function toContent(
  product: Pick<Product, "sku" | "name" | "price">,
  quantity: number,
): XPixelContent {
  return {
    content_id: product.sku,
    content_name: product.name,
    content_price: product.price,
    content_type: PRODUCT_CATEGORY,
    num_items: quantity,
  };
}
