# 08: Rotate leaked secrets, env config, and CI smoke tests

**What to build:** As a maintainer, I can clone the repo, configure it from examples without seeing anyone's password, and trust CI to catch broken builds, failing types, and dead endpoints before merge.

**Blocked by:** None (can start immediately; re-verify after 02–07).

**Status:** ready-for-agent

- [ ] Leaked `MONGO_URL` in `backend/node/.env` (contains a real username/password, currently committed) rotated in Atlas, the file removed from git history/`gitignore`d, and only `backend/php/.env.example`-style examples (`backend/node/.env.example`, `frontend/vue/.env.example` with `VITE_API_URL`) remain
- [ ] No secrets in the repo: `rg -i "mongodb://|MONGO_URL|jwt.*secret|stripe.*sk_"` finds only `.example` placeholders; `server.ts` fails fast with a clear message when `MONGO_URL`/`JWT_SECRET` are missing, in dev and Vercel (`vercel.json` routes) alike
- [ ] CI workflow added (`.github/workflows/ci.yml`): Node backend `tsc` + smoke tests, frontend `vue-tsc` typecheck + `vite build`, Laravel `phpunit` (at least the existing example tests), Spring `mvn -q test` or an explicit skip with reason; `npm run lint`/`typecheck` wired so `frontend/vue` isn't uncheckable
- [ ] Dependency hygiene: unpinned `"@nuxt/ui": "latest"` pinned, `sqlite3` vs `mongoose` dual-DB confusion resolved (one documented data store per backend), `multer`/`swagger`/`morgan` either wired or removed, root `fly.toml` vs `backend/spring/fly.toml` duplication resolved
- [ ] Verified: fresh `git clone` → copy `.example` files → `npm install`/`composer install` → typecheck/tests pass; `git log --all -p -S "F358wr9Q9OMoaZpX"` no longer shows the live credential in history (or a rotation note explains the remediation)
