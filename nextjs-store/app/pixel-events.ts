export const events = {
  contentView: process.env.NEXT_PUBLIC_X_CONTENT_VIEW_EVENT_ID as string,
  addToCart: process.env.NEXT_PUBLIC_X_ADD_TO_CART_EVENT_ID as string,
  checkoutInitiated: process.env
    .NEXT_PUBLIC_X_CHECKOUT_INITIATED_EVENT_ID as string,
  purchase: process.env.NEXT_PUBLIC_X_PURCHASE_EVENT_ID as string,
};
