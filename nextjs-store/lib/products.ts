export type ProductShape =
  "mug" | "bowl" | "vase" | "plate" | "planter" | "carafe";

export interface Product {
  slug: string;
  sku: string;
  name: string;
  price: number;
  shape: ProductShape;
  glaze: string;
  background: string;
  tagline: string;
  description: string;
  details: string[];
}

export const PRODUCT_CATEGORY = "Home & Garden > Kitchen & Dining > Tableware";

export const products: Product[] = [
  {
    slug: "morning-mug",
    sku: "KLN-MUG-01",
    name: "Morning Mug",
    price: 28,
    shape: "mug",
    glaze: "#c9774f",
    background: "#f3e4d7",
    tagline: "Terracotta glaze, 12 oz",
    description:
      "A wide-handled mug thrown on the wheel and finished in our terracotta glaze. Heavy enough to feel good in the hand, light enough for a second cup.",
    details: [
      "12 oz / 355 ml",
      "Dishwasher and microwave safe",
      "Stoneware, food-safe glaze",
    ],
  },
  {
    slug: "everyday-bowl",
    sku: "KLN-BWL-02",
    name: "Everyday Bowl",
    price: 34,
    shape: "bowl",
    glaze: "#6f8f7a",
    background: "#e3ebe4",
    tagline: "Sage glaze, 6 in",
    description:
      "Our most-used shape. Deep enough for soup, shallow enough for salad, with a soft sage glaze that pools darker at the rim.",
    details: [
      "6 in diameter, 3 in deep",
      "Dishwasher safe",
      "Stoneware, food-safe glaze",
    ],
  },
  {
    slug: "bud-vase",
    sku: "KLN-VSE-03",
    name: "Bud Vase",
    price: 42,
    shape: "vase",
    glaze: "#2f4858",
    background: "#dde4ea",
    tagline: "Deep slate glaze, 7 in",
    description:
      "A narrow-necked vase for a single stem or a few sprigs. Glazed inside so it holds water, left raw at the foot to show the clay.",
    details: ["7 in tall", "Watertight", "Hand wash recommended"],
  },
  {
    slug: "dinner-plate",
    sku: "KLN-PLT-04",
    name: "Dinner Plate",
    price: 38,
    shape: "plate",
    glaze: "#e8dcc8",
    background: "#efe9df",
    tagline: "Oat glaze, 10.5 in",
    description:
      "A generous dinner plate with a gently raised rim. The oat glaze has a speckle from iron in the clay, so no two are quite alike.",
    details: [
      "10.5 in diameter",
      "Dishwasher and microwave safe",
      "Stoneware, food-safe glaze",
    ],
  },
  {
    slug: "table-planter",
    sku: "KLN-PLN-05",
    name: "Table Planter",
    price: 48,
    shape: "planter",
    glaze: "#b5654a",
    background: "#f1e0d6",
    tagline: "Rust glaze, with drainage",
    description:
      "A tapered planter sized for herbs or a small succulent. Comes with a drainage hole and a matching saucer.",
    details: [
      "5 in tall, 5.5 in wide",
      "Drainage hole and saucer",
      "Indoor use",
    ],
  },
  {
    slug: "water-carafe",
    sku: "KLN-CRF-06",
    name: "Water Carafe",
    price: 56,
    shape: "carafe",
    glaze: "#8a9bb0",
    background: "#e4e8ee",
    tagline: "Mist glaze, 1 L",
    description:
      "A bedside or table carafe with a slim neck that pours without dripping. Pairs with the Morning Mug as a cup.",
    details: [
      "1 L / 34 oz",
      "Hand wash recommended",
      "Stoneware, food-safe glaze",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
