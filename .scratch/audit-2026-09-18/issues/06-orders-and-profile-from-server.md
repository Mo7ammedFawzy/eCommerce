# 06: Server-backed orders history and profile

**What to build:** As a shopper, I can open Profile → Orders and see every order I placed (on any device), open one for details, and see my profile info from the server instead of stale local data.

**Blocked by:** 05 (server-persistent cart and checkout); needs 03 (auth).

**Status:** ready-for-agent

- [ ] Node order read routes added (`GET /api/orders`, `GET /api/orders/:id` scoped to the logged-in user, plus `GET /api/admin/orders` + `PUT /api/orders/:id/status` for admins) with 404 for other users' ids, not a leak
- [ ] Frontend `store/order.ts` reads from the API (not just `localStorage`): orders list, `OrderPage` detail, item counts, totals, and `state` badges (`pending/confirmed/shippd/delivered/canceled` — including the `shippd` typo decision) render from server data with loading/empty states
- [ ] `ProfilePage`/`GeneralPage` load and update via `GET /api/auth/me` + `PUT /api/users/:id` (photo upload kept or explicitly dropped per TODO "upload photo" note), with validation errors shown inline
- [ ] Order placement in 05 immediately appears in the orders list without a manual reload; direct navigation to `/profile/orders/:bad-id` shows a not-found state instead of blank (fixes `isOrderValid` uuid-only check)
- [ ] Demoable: place two orders → both appear after reload on a second browser → each detail matches server totals; logged-out visit redirects to login (with 07) or shows a login prompt
