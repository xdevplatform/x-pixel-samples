import type { Product } from "@/lib/products";

function Shape({ shape, glaze }: Pick<Product, "shape" | "glaze">) {
  switch (shape) {
    case "mug":
      return (
        <>
          <path
            d="M128 92 q30 0 30 26 t-30 26"
            fill="none"
            stroke={glaze}
            strokeWidth="11"
            strokeLinecap="round"
          />
          <rect x="58" y="72" width="76" height="92" rx="14" fill={glaze} />
          <ellipse cx="96" cy="74" rx="38" ry="7" fill="#000" opacity="0.12" />
        </>
      );
    case "bowl":
      return (
        <>
          <path d="M40 104 h120 q-6 58 -60 60 q-54 -2 -60 -60 z" fill={glaze} />
          <ellipse cx="100" cy="104" rx="60" ry="11" fill={glaze} />
          <ellipse
            cx="100"
            cy="104"
            rx="52"
            ry="7"
            fill="#000"
            opacity="0.14"
          />
        </>
      );
    case "vase":
      return (
        <>
          <path
            d="M88 48 h24 v18 q0 10 12 24 q18 20 18 44 q0 30 -42 30 q-42 0 -42 -30 q0 -24 18 -44 q12 -14 12 -24 z"
            fill={glaze}
          />
          <ellipse cx="100" cy="48" rx="12" ry="4" fill="#000" opacity="0.18" />
        </>
      );
    case "plate":
      return (
        <>
          <ellipse cx="100" cy="122" rx="72" ry="30" fill={glaze} />
          <ellipse
            cx="100"
            cy="118"
            rx="72"
            ry="30"
            fill={glaze}
            stroke="#000"
            strokeOpacity="0.08"
          />
          <ellipse
            cx="100"
            cy="118"
            rx="50"
            ry="19"
            fill="#000"
            opacity="0.06"
          />
        </>
      );
    case "planter":
      return (
        <>
          <path
            d="M100 96 q-4 -30 -26 -42 q20 2 28 30 q6 -34 30 -40 q-20 16 -24 52 z"
            fill="#5f7d5a"
          />
          <path d="M60 96 h80 l-10 66 h-60 z" fill={glaze} />
          <rect x="56" y="90" width="88" height="12" rx="4" fill={glaze} />
          <ellipse
            cx="100"
            cy="166"
            rx="40"
            ry="6"
            fill={glaze}
            opacity="0.7"
          />
        </>
      );
    case "carafe":
      return (
        <>
          <path
            d="M90 42 h20 v34 q34 16 34 54 q0 36 -44 36 q-44 0 -44 -36 q0 -38 34 -54 z"
            fill={glaze}
          />
          <ellipse
            cx="100"
            cy="42"
            rx="10"
            ry="3.5"
            fill="#000"
            opacity="0.2"
          />
        </>
      );
    default: {
      const unreachable: never = shape;
      return unreachable;
    }
  }
}

export function ProductArt({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={product.name}
    >
      <rect width="200" height="200" fill={product.background} />
      <ellipse cx="100" cy="170" rx="62" ry="8" fill="#000" opacity="0.08" />
      <Shape shape={product.shape} glaze={product.glaze} />
    </svg>
  );
}
