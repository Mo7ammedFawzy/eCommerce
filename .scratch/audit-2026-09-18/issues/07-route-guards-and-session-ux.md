# 07: Route guards, session persistence, and checkout validation UX

**What to build:** As a shopper, I am guided to login when I hit a protected page, stay logged in across reloads, and always understand why checkout or a form was blocked — I never stare at an empty page or a silent disabled button.

**Blocked by:** 03 (auth vertical slice).

**Status:** ready-for-agent

- [ ] Router guards added in `frontend/vue/src/router/index.ts`: `/checkout`, `/profile/*`, `/dashboard` require a valid session (redirect to `/auth/login` with return-to); `/auth/*` redirects to home when already logged in; session restored from refresh token on app boot
- [ ] API layer (`composables/useApi.ts`) sends the access token, refreshes once on 401, and normalises the broken query-string builder (fixes missing `&` separators and `deleteEmptyValues` mutating the input); `BASE_URL` comes from env (`import.meta.env`) not the hardcoded `NODE_URL`, with dev/prod values documented
- [ ] Checkout `Place Order` gives visible feedback on every path: invalid form → scrolls to first error + summary message (closes the TODO item), empty cart → link to products, server failure → error toast with retry; no dead commented-out `UButton` blocks left behind
- [ ] Auth forms show field-level (zod) + server-level errors, disable submit while pending, and handle expired-session edge (mid-checkout 401 → re-login → resume checkout without losing the cart)
- [ ] Demoable: logged-out `/checkout` → login → back to checkout with cart intact; expired token reload keeps me logged in; invalid checkout submit shows exactly what is missing
