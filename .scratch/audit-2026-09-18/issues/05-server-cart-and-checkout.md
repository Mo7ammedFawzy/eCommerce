# 05: Server-persistent cart and checkout place-order

**What to build:** As a shopper, I can add items to my cart on one device, reload or switch devices, and my cart is still there; placing an order at checkout creates a real server order and clears the cart.

**Blocked by:** 03 (auth vertical slice — cart is per-user).

**Status:** ready-for-agent

- [ ] Node cart schema + routes added per `backend/node/Readme.md` contract (`GET /api/cart`, `POST /api/cart`, `PUT /api/cart/:itemId`, `DELETE /api/cart/:itemId`, `DELETE /api/cart`): auth-required, validates product id/stock/quantity, merges local cart on login
- [ ] Order creation route added (`POST /api/orders` with customer snapshot, items, total incl. shipping, `paymentMethod`, initial `pending` state): validates non-empty cart, decrements/confirms stock, returns order id; `orderStore.placeOrder` calls it instead of only pushing to `localStorage`
- [ ] Frontend `store/cart.ts` synced to server (load on login, optimistic update + rollback on 4xx, `saveLocal` kept as offline fallback only); `CheckoutUserInfoForm` + `CheckoutPage` handle empty-cart, out-of-stock, and server errors with visible messages (fixes TODO "add error form at place order")
- [ ] Payment method no longer silently COD-only: only `cash_on_delivery` enabled with a clear label, or real Stripe/paypal path from Laravel `StripePaymentController` is wired — shopper never thinks a disabled option worked
- [ ] Demoable: login → add to cart → reload (cart persists from server) → checkout → order id returned → cart empty; placing order with empty cart or zero stock is blocked with a message
