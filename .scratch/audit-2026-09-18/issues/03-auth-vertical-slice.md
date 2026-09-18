# 03: Complete auth vertical slice (register/login/me/refresh/logout)

**What to build:** As a shopper, I can register, log in, stay logged in across reloads, view my profile, and log out — against the real Node API instead of mocked/FakeStore auth — with passwords never stored in plain text.

**Blocked by:** 02 (Express router and error handling).

**Status:** ready-for-agent

- [ ] `authController.register` finished: validates name/email/password, rejects duplicate email with 400, hashes password with `bcrypt` before `userService.create`, returns 201 user (no password hash) — replaces commented-out stub
- [ ] `login` issues short-lived access JWT + rotating refresh token (persisted in `refreshTokens`), `GET /api/auth/me` guarded by auth middleware returns current user, `POST /api/auth/refresh` rotates, `POST /api/auth/logout` revokes; copy-paste route aliases (`/forgot`, `/reset`, `/update`, `/verify/:token` all pointing at `logout`) fixed or removed
- [ ] Auth middleware (verify JWT, attach user, 401 on missing/expired) applied to `/me`, `/users/*`, and later cart/order routes; `Roles.Admin` vs `Roles.User` enforced where the Readme promises `(Admin)`
- [ ] Frontend `views/auth/login.vue` and `register.vue` replaced (currently bare `<ComingSoon/>`): real forms with validation, calling `POST /api/auth/*`, persisting session, showing server errors, navigating to profile/home on success
- [ ] End-to-end demoable: register → login → reload (still logged in) → `GET /me` → logout → `GET /me` gives 401; password in DB is a bcrypt hash, refresh-token reuse is rejected
