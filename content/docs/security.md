---
title: Security basics
description: The minimum controls to apply before moving a voice integration to production.
category: Security
order: 4
---

# Security basics

Treat API keys as production credentials. Keep them in your deployment secret manager, rotate them when a team member leaves, and scope access to the smallest useful surface.

## Before launch

- Enforce HTTPS for every request.
- Keep secrets on the server side.
- Add rate limits around user-controlled generation.
- Monitor unusual usage and revoke compromised keys immediately.