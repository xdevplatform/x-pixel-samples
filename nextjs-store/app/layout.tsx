import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { XPixel } from "@/components/x-pixel";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiln & Co. — Handmade stoneware",
  description: "Small-batch stoneware for everyday use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="announcement">
            Free shipping on orders over $75 · Every piece made by hand in our
            studio
          </div>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <p className="logo">Kiln &amp; Co.</p>
                <p className="muted">
                  Small-batch stoneware, thrown and glazed by hand. Made to be
                  used every day.
                </p>
              </div>
              <div>
                <h4>Shop</h4>
                <ul>
                  <li>
                    <Link href="/#shop">All pieces</Link>
                  </li>
                  <li>
                    <Link href="/products/morning-mug">Mugs</Link>
                  </li>
                  <li>
                    <Link href="/products/everyday-bowl">Bowls</Link>
                  </li>
                  <li>
                    <Link href="/products/bud-vase">Vases</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Help</h4>
                <ul>
                  <li>Shipping &amp; returns</li>
                  <li>Care guide</li>
                  <li>hello@kiln.example</li>
                </ul>
              </div>
            </div>
            <div className="container footer-note muted">
              <p>
                Demo store for the X Pixel. No orders are shipped or charged.
              </p>
            </div>
          </footer>
        </CartProvider>
        <XPixel pixelId={process.env.NEXT_PUBLIC_X_PIXEL_ID as string} />
      </body>
    </html>
  );
}
