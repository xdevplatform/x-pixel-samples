import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/format";

interface Props {
  subtotal: number;
  shipping: number;
  total: number;
  children?: React.ReactNode;
}

export function OrderSummary({ subtotal, shipping, total, children }: Props) {
  return (
    <aside className="summary">
      <h2>Summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {shipping > 0 && (
        <p className="muted small">
          Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free
          shipping.
        </p>
      )}
      {children}
    </aside>
  );
}
