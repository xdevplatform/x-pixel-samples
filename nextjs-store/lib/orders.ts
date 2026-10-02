export interface OrderItem {
  sku: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  phone?: string;
  name: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  placedAt: string;
}

const orderKey = (id: string) => `kiln-order:${id}`;
const trackedKey = (id: string) => `kiln-order-tracked:${id}`;

export function createOrderId(): string {
  return `KLN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function saveOrder(order: Order): void {
  sessionStorage.setItem(orderKey(order.id), JSON.stringify(order));
}

export function loadOrder(id: string): Order | undefined {
  const saved = sessionStorage.getItem(orderKey(id));
  return saved ? (JSON.parse(saved) as Order) : undefined;
}

/** Returns true the first time it is called for an order, so a refresh does not report the purchase twice. */
export function claimPurchaseTracking(id: string): boolean {
  if (sessionStorage.getItem(trackedKey(id))) return false;
  sessionStorage.setItem(trackedKey(id), "1");
  return true;
}
