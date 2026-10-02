"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { events } from "@/app/pixel-events";
import { OrderSummary } from "@/components/order-summary";
import { sendXEvent } from "@/components/x-pixel";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { createOrderId, saveOrder } from "@/lib/orders";
import { toContent } from "@/lib/pixel-contents";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, ready, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const checkoutTracked = useRef(false);

  useEffect(() => {
    if (!ready || items.length === 0 || checkoutTracked.current) return;
    checkoutTracked.current = true;
    sendXEvent(events.checkoutInitiated, {
      value: total,
      currency: "USD",
      contents: items.map(({ product, quantity }) =>
        toContent(product, quantity),
      ),
    });
  }, [ready, items, total]);

  if (!ready) return <div className="container section" />;

  if (items.length === 0 && !placing) {
    return (
      <div className="container section empty">
        <h1>Nothing to check out</h1>
        <Link href="/#shop" className="button">
          Browse the collection
        </Link>
      </div>
    );
  }

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") ?? "").trim();
    const id = createOrderId();
    saveOrder({
      id,
      email: String(form.get("email")),
      phone: phone || undefined,
      name: String(form.get("name")),
      address: [form.get("address"), form.get("city"), form.get("zip")].join(
        ", ",
      ),
      items: items.map(({ product, quantity }) => ({
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
      })),
      subtotal,
      shipping,
      total,
      placedAt: new Date().toISOString(),
    });
    setPlacing(true);
    clear();
    router.push(`/order/${id}`);
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form id="checkout" className="checkout-form" onSubmit={placeOrder}>
          <fieldset>
            <legend>Contact</legend>
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone <span className="muted">(optional, with country code)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Shipping</legend>
            <label>
              Full name
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Address
              <input name="address" required autoComplete="street-address" />
            </label>
            <div className="row">
              <label>
                City
                <input name="city" required autoComplete="address-level2" />
              </label>
              <label>
                ZIP
                <input name="zip" required autoComplete="postal-code" />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Payment</legend>
            <label>
              Card number
              <input
                name="card"
                defaultValue="4242 4242 4242 4242"
                inputMode="numeric"
              />
            </label>
            <p className="muted small">Demo store: no payment is taken.</p>
          </fieldset>
        </form>
        <OrderSummary subtotal={subtotal} shipping={shipping} total={total}>
          <ul className="summary-items">
            {items.map(({ product, quantity }) => (
              <li key={product.slug}>
                <span>
                  {product.name} × {quantity}
                </span>
                <span>{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            form="checkout"
            className="button full"
            disabled={placing}
          >
            {placing ? "Placing order…" : `Place order · ${formatPrice(total)}`}
          </button>
        </OrderSummary>
      </div>
    </div>
  );
}
