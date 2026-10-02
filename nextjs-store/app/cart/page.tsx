"use client";

import Link from "next/link";
import { OrderSummary } from "@/components/order-summary";
import { ProductArt } from "@/components/product-art";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, shipping, total, ready, setQuantity, remove } =
    useCart();

  if (!ready) return <div className="container section" />;

  if (items.length === 0) {
    return (
      <div className="container section empty">
        <h1>Your cart is empty</h1>
        <Link href="/#shop" className="button">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Cart</h1>
      <div className="checkout-layout">
        <ul className="cart-lines">
          {items.map(({ product, quantity }) => (
            <li key={product.slug} className="cart-line">
              <Link href={`/products/${product.slug}`}>
                <ProductArt product={product} className="cart-line-art" />
              </Link>
              <div className="cart-line-info">
                <Link href={`/products/${product.slug}`}>
                  <strong>{product.name}</strong>
                </Link>
                <span className="muted">{formatPrice(product.price)}</span>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => remove(product.slug)}
                >
                  Remove
                </button>
              </div>
              <div className="quantity">
                <button
                  type="button"
                  aria-label={`Decrease ${product.name}`}
                  onClick={() => setQuantity(product.slug, quantity - 1)}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase ${product.name}`}
                  onClick={() => setQuantity(product.slug, quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="price">
                {formatPrice(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>
        <OrderSummary subtotal={subtotal} shipping={shipping} total={total}>
          <Link href="/checkout" className="button full">
            Check out
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
