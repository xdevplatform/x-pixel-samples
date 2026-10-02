"use client";

import Link from "next/link";
import { useState } from "react";
import { events } from "@/app/pixel-events";
import { sendXEvent } from "@/components/x-pixel";
import { useCart } from "@/lib/cart";
import { toContent } from "@/lib/pixel-contents";
import { getProduct } from "@/lib/products";

export function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="add-to-cart">
      <div className="quantity">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span aria-live="polite">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="button"
        onClick={() => {
          add(slug, quantity);
          setAdded(true);
          const product = getProduct(slug);
          if (product) {
            sendXEvent(events.addToCart, {
              value: product.price * quantity,
              currency: "USD",
              contents: [toContent(product, quantity)],
            });
          }
        }}
      >
        Add to cart
      </button>
      {added && (
        <p className="added" role="status">
          Added. <Link href="/cart">View cart →</Link>
        </p>
      )}
    </div>
  );
}
