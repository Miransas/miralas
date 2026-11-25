# AGENTS.md — Miransas  Engineering Rules


## Git Workflow — Task Completion

After completing an assigned task:

1. Run all relevant tests, lint checks and type checks.
2. Review `git status` and `git diff`.
3. Verify that no secrets, credentials, generated model weights or unrelated changes will be committed.
4. If required checks pass, commit only the files belonging to the completed task.
5. Push the commit to the existing current working branch, provided the remote and branch are verified.
6. Report the commit hash, branch, push result and verification status.

If tests fail, the branch is ambiguous, the remote is unexpected, or unrelated changes cannot be safely separated, stop and report the blocker.

Never force-push, deploy to production or execute destructive production migrations automatically.

Follow an explicit task-specific instruction if it overrides this workflow.

## 1. Project Identity

- Parent brand: **Miransas**.
- Product: **Miralas Console**.
- Repository: `Miransas/miralas-console`.
- This is a real Voice AI product, not a mockup or throwaway demo.
- Uzbek is a first-class language priority.
- Preserve the existing product identity and established architecture.

## 2. Technology Stack

- Frontend: Next.js 16, TypeScript, Tailwind CSS, Framer Motion, pnpm.
- API/backend: Rust, Tokio, SQLx, PostgreSQL.
- Voice inference: Python, uv, gRPC.
- Database: PostgreSQL; Neon may be used remotely.
- Billing provider planned: Polar.sh.
- Voice model baseline: Chatterbox Multilingual V3.

Inspect actual manifests and source code before assuming versions, commands, capabilities or implementations.

## 3. Engineering Principles

- Prefer small, focused, production-quality changes.
- Understand existing code before modifying it.
- Preserve working features and established behavior.
- Avoid unnecessary abstractions, dependencies and rewrites.
- Do not silently expand task scope.
- Never replace real functionality with mock data.
- Never claim unfinished features are operational.
- Treat TODOs, disabled features and missing backend support honestly.
- Explain significant architectural tradeoffs.
- Prefer correctness, maintainability and measurable performance over cleverness.

## 4. Work Discipline

Before modifying code:

1. Read relevant documentation and source files.
2. Run `git status --short`.
3. Identify existing uncommitted changes.
4. Inspect relevant tests and migrations.
5. Determine the smallest safe implementation.
6. Check whether the requested work overlaps with ongoing tasks.

During implementation:

- Modify only files required by the task.
- Preserve unrelated local changes.
- Keep existing public APIs compatible unless explicitly authorized.
- Do not fabricate successful tool outputs.
- Do not hide test failures.
- Do not automatically start the next numbered task.

After implementation:

- Verify the affected functionality.
- Report changed files and exact checks performed.
- Distinguish passed, failed, skipped and blocked tests.
- Document remaining risks and follow-up work.

## 5. Rust Backend

- Prefer idiomatic, safe Rust.
- Use structured, typed errors.
- Never panic on untrusted user input.
- Preserve session, authentication and authorization boundaries.
- Validate user identity and feature entitlement server-side.
- Apply rate limits and resource bounds where appropriate.
- Prevent race conditions in quota and usage accounting.
- Use PostgreSQL-backed atomic operations for cross-instance correctness.
- Never keep a database transaction open during slow model inference.
- Make retries and accounting operations idempotent where necessary.
- Preserve existing application startup behavior:

`cargo run -p api`

Never assume memory safety alone guarantees application security.

## 6. PostgreSQL and SQLx Safety

- Never execute destructive development or test operations against Neon or production.
- Use an explicitly configured, isolated test database.
- Current local test database: `miransas_test` on `127.0.0.1:5432`.
- Verify the effective database connection before migrations or integration tests.
- Never use an ambiguous `DATABASE_URL` for destructive test execution.
- Add forward-only migrations.
- Do not edit already-applied migrations.
- Preserve existing user and billing records.
- Avoid unsafe dynamic SQL.
- Use transactions for operations that require atomicity.
- Never assume an integration test passed when it was skipped.

## 7. Authentication and Security

- Never expose secrets, tokens or passwords in logs or responses.
- Never commit `.env` credentials.
- Never silently truncate passwords.
- Preserve compatibility with existing password hashes.
- Apply authorization at backend boundaries, not only in the UI.
- Use least-privilege access.
- Validate all user-controlled input.
- Protect against cross-account access.
- Treat voice identity and cloning data as sensitive.
- Require appropriate consent and ownership controls for voice cloning.
- Avoid implementing impersonation-friendly shortcuts.
- Treat admin authorization as a backend security responsibility.

Development-only authentication bypasses must remain isolated from production.

## 8. Voice AI and Python

- Keep Rust API and Python inference responsibilities clearly separated.
- Preserve existing gRPC contracts unless the task explicitly changes them.
- Bound inference concurrency and resource consumption.
- Handle timeouts, cancellation and worker failures safely.
- Do not assume GPU resources are always available.
- Avoid loading large models per request.
- Validate audio inputs and output formats.
- Do not fabricate generated audio or transcriptions.

Existing Python worker startup:

`cd tts-worker && uv run tts-worker`

## 9. Product Entitlements

Product decisions:

- Free TTS allowance: **10,000 characters per UTC calendar month**.
- Free Sound Effects allowance: **3 successful generations per account in total**, once the actual engine and accounting are implemented.
- Voice Cloning requires an eligible paid entitlement.
- Developer API access is a separate entitlement.
- Voice Agents are not yet available.

Preserve established tier identifiers:

- `free`
- `pro`
- `custom`
- `developer`

Do not invent paid subscriptions, wallet balances, credits or payment confirmations.

Backend behavior must be authoritative.

Do not modify quotas or entitlements outside explicitly assigned work.

## 10. Frontend Design System

Preserve the Miransas visual identity:

- Dark base: `#050505`.
- Light base: `#EFEFEF`.
- Major surfaces: `rounded-4xl` where appropriate.
- Premium, minimal, calm interface.
- Subtle shadows and surface contrast.
- Controlled animation and hover feedback.
- Consistent typography.
- Accessible keyboard focus and controls.

Avoid:

- Neon-heavy UI.
- Excessive green or blue accents.
- Harsh white and black borders.
- Unnecessary bento grids.
- Oversized buttons.
- Random gradients or decorative clutter.
- Duplicate page headers.
- Fake dashboards and placeholder metrics.

Prefer borderless cards when practical, with functional borders only where needed.

Respect dark and light themes, existing responsive layouts and the `/console` basePath.

## 11. Frontend Product Structure

- Home: discovery and overview.
- Studio: creative workflow discovery, navigation and examples.
- Workspace: focused creation tools.
- Billing: real subscription and payment state only.
- Developers: actual API functionality and truthful availability.
- Voice Agents: coming soon until real backend support exists.

Reuse existing components and routes.

Do not create duplicate editors inside Studio.

## 12. Verification

For Rust changes, run when applicable:

- `cargo fmt --all -- --check`
- `cargo check --workspace`
- `cargo clippy --workspace --all-targets -- -D warnings`
- `cargo test --workspace`

Run relevant PostgreSQL integration tests only against the verified isolated test database.

For frontend changes, inspect available package scripts, then run applicable:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm build`

Run commands from the correct package directory.

Do not claim success for checks that were not actually run.

## 13. Git and Deployment

- Standing user preference: after completing a task, run relevant checks,
  inspect YAML/workflow configuration and git status, then commit and push
  the completed task changes. A task-specific instruction prohibiting commit
  or push overrides this default. Never stage secrets or unrelated work.
- Never force-push or deploy without separate explicit authorization.
- Never delete unrelated user changes.
- Never reset the working tree without explicit authorization.
- Never introduce a new repository without explicit authorization.
- Never modify production infrastructure or data without explicit authorization.
- Report migration and deployment requirements before applying them.

## 14. Working Relationship

The developer prefers focused, step-by-step tasks.

- Complete only the requested task.
- Keep changes reviewable.
- Explain important decisions clearly.
- Prefer concrete results over long speculative plans.
- When blocked, explain the precise blocker.
- Never pretend a partial implementation is complete.

End each completed task with:

1. Summary
2. Files changed
3. Tests and verification
4. Remaining risks or blockers
5. Suggested next task

Do not start the suggested next task without authorization.
