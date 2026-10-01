# X Pixel with Next.js

This sample shows how to add the [X Pixel](https://help.x.com/en/business-and-advertising/conversion-tracking-for-websites) to a Next.js App Router app. The `XPixel` Client Component in `app/layout.tsx` loads the X conversion tracking base code with [`next/script`](https://nextjs.org/docs/app/api-reference/components/script) and sends a page view on every client-side navigation. The `sendXEvent` function is fired in the `EventButton` Client Component.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xdevplatform/x-pixel-samples/tree/main/nextjs&project-name=x-pixel-nextjs&repository-name=x-pixel-nextjs&env=NEXT_PUBLIC_X_PIXEL_ID,NEXT_PUBLIC_X_PURCHASE_EVENT_ID)

## How to use

Bootstrap the sample with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app):

```bash
npx create-next-app --example https://github.com/xdevplatform/x-pixel-samples/tree/main/nextjs my-app
```

Copy the `.env.local.example` file to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_X_PIXEL_ID` to your pixel ID from X Ads Events Manager. To send the purchase event, create an event in Events Manager and set `NEXT_PUBLIC_X_PURCHASE_EVENT_ID` to its event ID (it looks like `tw-abc12-def34`). Each event you create has its own ID.

Start the development server:

```bash
npm run dev
```

## How page views are counted

The base code's `twq('config', …)` call sends a page view for the page the app loads on. After that, `XPixel` sends a page view each time the pathname changes, so the first page is not counted twice.
