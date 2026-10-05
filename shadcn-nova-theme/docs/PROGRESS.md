# Progress & Handoff

Read this first in every new chat, then `README.md` (the foundation spec).
Update this file at the end of every milestone. **Every time it is updated,
tell the user that it was updated and list what changed.**

Last updated: 2026-10-05

## Goal

Build a reusable agent workflow for new projects:

1. **Setup** — agent asks questions, then builds the bare-minimum foundation
   (spec: `README.md`, later a setup skill).
2. **Domain file** — user provides one file with the business knowledge
   (template to be defined after a few modules are built).
3. **Plan → build** — agent proposes a module plan from the domain file, user
   approves, agent builds modules using skills.

This repo is a POC. Each real use case we implement here becomes one
**self-contained skill** (carries its own reference code, can be copied to any
project). Skills fix the **mechanism** (props, open/close flow, form handling,
submit, file names); design stays free for the agent.

## Working rules (from the user)

- Never assume. Check first (read, run, test), then answer.
- Reading files needs no permission.
- Any change (install, edit, create) needs a short plan + user approval.
- The user makes all git commits.
- Answers: short, straightforward bullet points.
- No plan mode, no subagents unless asked.
- After updating this file, tell the user it was updated and what changed.

## Environment

- Repo root: `Nextjs-16/` (many POCs). Working project: `shadcn-nova-theme/`.
- Chat is opened from `Nextjs-16/`, so a temporary `Nextjs-16/.mcp.json`
  exists (shadcn with `--cwd shadcn-nova-theme`, ag-mcp). Fine to keep; POC.
- `shadcn-nova-theme/.mcp.json` also exists (used when the folder is opened
  directly).
- At the start of a session using AG Grid docs: call ag-mcp `set_versions`
  with `36.0.0` / `react` (bun blocks auto-detect).
- `.env` has `DATABASE_URL`, `REDIS_URL`.

## Done

- Explored the project; no feature code yet (`/` empty, `/admin/dashboard`
  placeholder, admin sidebar skeleton, customer/vendor bare layouts).
- Installed: react-hook-form, zod, @hookform/resolvers, ag-grid-react +
  ag-grid-community 36.2.0, bullmq, ioredis. User installed Drizzle (rc), pg,
  dotenv, drizzle-kit, tsx.
- MCPs: shadcn (trial), ag-mcp. Next.js MCP skipped (docs are bundled).
- User added `db/` (Drizzle client, empty schema), `bullmq/` (queues, worker,
  leader-elected scheduler, jobs, schema), `drizzle.config.ts`, db scripts.
- Created `actions/`, `services/` (empty), `lib/utils.ts`.
- Wrote `README.md` = foundation spec. Setup command tested from scratch.
- `bun run typecheck` passes.
- Installed `server-only`. Worker/scheduler scripts now run with
  `tsx --conditions=react-server` (see Decisions).
- First Drizzle migration generated + applied (`scheduled_tasks`,
  `job_results`). `bun run worker` + `bun run scheduler` tested against real
  Redis/Postgres: heartbeat job runs every 15s.

## Decisions

- Stack is the same for every project (see `README.md`).
- AG Grid Community only.
- `actions/` and `services/` at root, module files `<module>-actions.ts`,
  `<module>-services.ts`. Components → actions → services; mobile API →
  services.
- Theme preset is a user input (never hardcoded).
- Skills: decide their shared-rules location after some use cases.
- `CLAUDE.md` later.
- The setup workflow will ask decision questions about **authentication**
  and the **proxy** (Next 16 renamed `middleware` → `proxy`). The questions
  are not decided yet.
- Actions: `"use server"` only.
- Services: `import "server-only"`. Never `"use server"` (it would make them
  callable from the browser).
- Every action checks auth itself; proxy is not enough. Auth mechanism: to be
  defined later.
- Auth (to implement later):
  - Library: Auth.js (`next-auth` v5, still beta). Better Auth is the
    alternative; re-check when implementing.
  - Files: `auth.config.ts` (rules: `authorized` callback, login page),
    `auth.ts` (full setup + providers), `proxy.ts` (built from
    `auth.config.ts` only, keeps it light) + `matcher`.
  - Every action: check the logged-in user (`auth()`).
  - `proxy.ts`: redirect users away from portals that are not theirs
    (`/403`).
  - Passwords: bcrypt, our code. `services/user-services.ts` hashes on
    sign-up and compares on login; `authorize()` calls it.
- `server-only` throws outside Next.js. Fix: worker/scheduler scripts use
  `tsx --conditions=react-server`, which loads its empty version (same as
  Next.js does). Tested: worker + scheduler run, `db`/`bullmq` load, external
  API calls (`fetch` to Microsoft Graph) work. The flag only affects packages
  with a `react-server` export (react, react-dom, react-hook-form,
  server-only, client-only); no security impact.

## Next step

**Use case 1: list page with AG Grid** (plan → approval → build).
Then **portals** — admin, customer, vendor; separate layouts, sidebars,
routes; a user cannot open another portal's routes.

## Open (TBD)

See `README.md` section 9.

- VAPT review: check the structure and plan against VAPT standards (OWASP).
