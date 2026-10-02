import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "./product-art";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <ProductArt product={product} className="product-card-art" />
      <div className="product-card-body">
        <div>
          <h3>{product.name}</h3>
          <p className="muted">{product.tagline}</p>
        </div>
        <span className="price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
