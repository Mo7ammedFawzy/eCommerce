# 01: Decide canonical backend and clean repo hygiene

**What to build:** As a contributor opening the repo, I can tell which backend is real (Node `backend/node`, Laravel `backend/php`, or Spring `backend/spring`), the README matches reality, and there is no dead scaffold confusing me — so every later ticket builds on the right stack.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] `CONTEXT.md` (or `CONTEXT-MAP.md`) plus one ADR records the canonical backend choice and what happens to the other two (keep as reference / archive / delete), with no contradiction to `AGENTS.md` domain docs
- [ ] Root `README.md` updated to describe the chosen stack, how `frontend/vue` talks to it, and correct setup (`npm run dev`, env, deploy); stale "frontend-only / FakeStoreAPI" notes removed or marked legacy
- [ ] `fly.toml` (root + `backend/spring/fly.toml`) points at the real Dockerfile/app name/region or is removed if unused; `backend/node/vercel.json` matches the canonical deploy target
- [ ] Dead scaffold decision recorded and executed: Node `todoModel/todoService/todoController/todoRoutes` and duplicate `DashboardPage.vue` either removed or explicitly kept with a reason
- [ ] Empty root `package-lock.json` (`{"packages":{}}`) either removed or replaced with real workspace config; `frontend/vue/README.md`, `backend/php/README.md`, `backend/node/Readme.md` endpoint lists reconciled with actual routes
