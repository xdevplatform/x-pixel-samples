import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import { getProduct, products } from "@/lib/products";
import { AddToCart } from "./add-to-cart";
import { TrackContentView } from "./track-content-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return { title: product ? `${product.name} — Kiln & Co.` : "Not found" };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = products
    .filter((other) => other.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="container section">
      <TrackContentView slug={product.slug} />
      <Link href="/#shop" className="back-link">
        ← All products
      </Link>
      <div className="product-detail">
        <ProductArt product={product} className="product-detail-art" />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="price large">{formatPrice(product.price)}</p>
          <p className="muted">{product.tagline}</p>
          <p>{product.description}</p>
          <AddToCart slug={product.slug} />
          <ul className="details">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <p className="muted small">SKU {product.sku}</p>
        </div>
      </div>

      <section className="section">
        <h2>You might also like</h2>
        <div className="product-grid">
          {related.map((other) => (
            <ProductCard key={other.slug} product={other} />
          ))}
        </div>
      </section>
    </div>
  );
}
