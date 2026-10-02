"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, ready } = useCart();
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="logo">
          Kiln &amp; Co.
        </Link>
        <nav className="site-nav">
          <Link href="/#shop">Shop</Link>
          <Link href="/cart" className="cart-link">
            Cart
            {ready && count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
