import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/format";
import { products } from "@/lib/products";

export default function Home() {
  const [featured] = products;
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">Small-batch stoneware</p>
            <h1>Made slowly, used every day.</h1>
            <p className="lead">
              Mugs, bowls and vases thrown by hand in our studio and glazed in
              colors pulled from the landscape around it.
            </p>
            <div className="hero-actions">
              <Link href="#shop" className="button">
                Shop the collection
              </Link>
              <span className="muted">
                Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </span>
            </div>
          </div>
          {featured && (
            <Link href={`/products/${featured.slug}`} className="hero-art">
              <ProductArt product={featured} />
            </Link>
          )}
        </div>
      </section>

      <section className="container values">
        <div className="value">
          <strong>Handmade in small batches</strong>
          <span className="muted">Thrown, trimmed and glazed by hand.</span>
        </div>
        <div className="value">
          <strong>
            Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}
          </strong>
          <span className="muted">Packed in recycled, plastic-free boxes.</span>
        </div>
        <div className="value">
          <strong>30-day returns</strong>
          <span className="muted">Not right for your table? Send it back.</span>
        </div>
      </section>

      <section id="shop" className="container section">
        <div className="section-heading">
          <h2>The collection</h2>
          <p className="muted">{products.length} pieces</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container quote">
        <blockquote>
          “The kind of mug you reach for first, every morning, without thinking
          about it.”
        </blockquote>
        <p className="muted">Sarah L., verified buyer</p>
      </section>
    </>
  );
}
