# 02: Fix Express router bootstrap and global error handling

**What to build:** As a frontend dev, I can call `GET /api/products`, `POST /api/auth/*`, and user routes without hanging or crashing, and every failure returns a consistent JSON error — so auth/product/cart work has a stable foundation.

**Blocked by:** None (can start immediately; preferred before 03–06).

**Status:** ready-for-agent

- [ ] All Node routers use `express.Router()` (fixes `const router = express().router` bug in `authRoutes`, `productRoutes`, `userRoutes`) and `app.ts` mounts `userRouter` (`GET /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`); wrong `router.delete("/", listAllUsers)` becomes `router.get("/")`
- [ ] Global 404 + error middleware wired in `app.ts` (existing empty `middlewares/errorHandler.ts` implemented, async errors forwarded via `next()`), consistent `{status, message, data}` shape from `ApiResponseKlass`
- [ ] CORS locked to an allowlist from env (fixes open `cors()` + dead `allowedOrigins` variable) and root `/` handler no longer says "Jobs API updated-2"
- [ ] Smoke-verified end to end: `GET /api/products`, `GET /api/products/:id` (valid + invalid id → 404), user list/update path, and unknown route → JSON 404; no unhandled promise rejection kills the server
- [ ] Minimal regression test or smoke script added (e.g. supertest/vitest) covering router mounting and error shape, runnable with one command and documented
