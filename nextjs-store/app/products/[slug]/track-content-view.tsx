"use client";

import { useEffect, useRef } from "react";
import { events } from "@/app/pixel-events";
import { sendXEvent } from "@/components/x-pixel";
import { toContent } from "@/lib/pixel-contents";
import { getProduct } from "@/lib/products";

export function TrackContentView({ slug }: { slug: string }): null {
  // React StrictMode runs effects twice in development; the ref keeps that to one event per product.
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    const product = getProduct(slug);
    if (!product || trackedSlug.current === slug) return;
    trackedSlug.current = slug;
    sendXEvent(events.contentView, {
      value: product.price,
      currency: "USD",
      contents: [toContent(product, 1)],
    });
  }, [slug]);

  return null;
}
