"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { events } from "@/app/pixel-events";
import { sendXEvent } from "@/components/x-pixel";
import { formatPrice } from "@/lib/format";
import { claimPurchaseTracking, loadOrder, type Order } from "@/lib/orders";
import { toContent } from "@/lib/pixel-contents";

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const saved = loadOrder(id);
    setOrder(saved ?? null);
    if (!saved || !claimPurchaseTracking(saved.id)) return;

    sendXEvent(events.purchase, {
      value: saved.total,
      currency: "USD",
      conversion_id: saved.id,
      email_address: saved.email,
      phone_number: saved.phone,
      contents: saved.items.map((item) => toContent(item, item.quantity)),
    });
  }, [id]);

  if (order === undefined) return <div className="container section" />;

  if (order === null) {
    return (
      <div className="container section empty">
        <h1>Order not found</h1>
        <p className="muted">
          Orders in this demo only live for the current browser tab.
        </p>
        <Link href="/" className="button">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container section confirmation">
      <p className="eyebrow">Order {order.id}</p>
      <h1>Thank you, {order.name.split(" ")[0]}.</h1>
      <p className="lead">
        We&apos;ve sent a confirmation to <strong>{order.email}</strong>. Your
        pieces ship to {order.address}.
      </p>
      <ul className="summary-items">
        {order.items.map((item) => (
          <li key={item.sku}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
        <li>
          <span>Shipping</span>
          <span>
            {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
          </span>
        </li>
        <li className="summary-total">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </li>
      </ul>
      <Link href="/" className="button">
        Keep shopping
      </Link>
    </div>
  );
}
