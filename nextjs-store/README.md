# X Pixel store with Next.js

This sample is a small online store built with the Next.js App Router. It sends the [X Pixel](https://help.x.com/en/business-and-advertising/conversion-tracking-for-websites) events a typical store needs, from viewing a product to placing an order. Each event includes the products, value, and currency, and the purchase also includes the order ID, email, and phone number.

The `XPixel` Client Component in `app/layout.tsx` loads the X conversion tracking base code and sends a page view on every client-side navigation. It works the same way as in the [Next.js sample](../nextjs).

| Event | Sent from | When |
| --- | --- | --- |
| Content view | `app/products/[slug]/track-content-view.tsx` | A product page opens |
| Add to cart | `app/products/[slug]/add-to-cart.tsx` | The Add to cart button is clicked |
| Checkout initiated | `app/checkout/page.tsx` | The checkout page opens with items in the cart |
| Purchase | `app/order/[id]/page.tsx` | The order confirmation page opens |

`lib/pixel-contents.ts` turns a product into the `contents` entry each event sends. The purchase sets `conversion_id` to the order ID, so you can [deduplicate](https://help.x.com/en/business-and-advertising/conversion-tracking-for-websites#deduplication-key) it against the same purchase sent from the Conversion API. The pixel hashes the email and phone number before sending them.

The store is a demo. Products and orders live in the browser, and no payment is taken.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xdevplatform/x-pixel-samples/tree/main/nextjs-store&project-name=x-pixel-nextjs-store&repository-name=x-pixel-nextjs-store&env=NEXT_PUBLIC_X_PIXEL_ID,NEXT_PUBLIC_X_CONTENT_VIEW_EVENT_ID,NEXT_PUBLIC_X_ADD_TO_CART_EVENT_ID,NEXT_PUBLIC_X_CHECKOUT_INITIATED_EVENT_ID,NEXT_PUBLIC_X_PURCHASE_EVENT_ID)

## How to use

Bootstrap the sample with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app):

```bash
npx create-next-app --example https://github.com/xdevplatform/x-pixel-samples/tree/main/nextjs-store my-store
```

Copy the `.env.local.example` file to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_X_PIXEL_ID` to your pixel ID from X Ads Events Manager. Then create four events in Events Manager (content view, add to cart, checkout initiated, and purchase) and set each `NEXT_PUBLIC_X_*_EVENT_ID` to its event ID. Event IDs look like `tw-abc12-def34`.

Start the development server:

```bash
npm run dev
```
