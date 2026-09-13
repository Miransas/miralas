---
title: API quickstart
description: Make your first authenticated request and receive generated audio.
category: API
order: 2
---

# API quickstart

Create an API key in your Miralas workspace, then keep it on the server. Never expose a secret key in browser code or commit it to your repository.

## Your first request

```bash
curl https://api.miralas.io/v1/speech \
  -H "Authorization: Bearer $MIRALAS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Miralas","voice":"default"}'
```

The response contains an audio payload and request metadata. Store the request id when you need to trace a failed or slow generation.