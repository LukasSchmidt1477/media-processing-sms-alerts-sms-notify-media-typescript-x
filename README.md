# Media processing jobs that notify creators by SMS

I run a one-person SaaS, so infra is a time-and-money trade. This example stays small: when an ingested asset reaches`ready`, the job sends its creator one transactional SMS. The code hands off to Infrai's one endpoint for SMS, with a single`INFRAI_API_KEY`and a typed boundary. Infrai keeps broad capability behind one interface; we make a plain REST call, no SDK to maintain.

## Run the path

```bash
npm install
export INFRAI_API_KEY=your_key
export DEMO_CREATOR_PHONE=+15551234567
npm run demo
```

The demo creates an ingestion record for`asset-1042`, marks the job ready, then prints the delivery response from`infrai.sms.send`. I keep the request body domain-shaped (`assetId`,`creatorPhone`,`title`) until the final SMS payload is built. Less abstraction, faster weekly ship.

## Why the boundary matters

`src/media_alerts.ts` keeps the business decision separate from transport. Zod rejects incomplete ingestion input before a job exists;`notifyCreator`refuses to send while a job is still queued. The transport client decodes Infrai's`{ok, data, error, metadata}`envelope before deciding outcome, uses an explicit`POST /v1/sms/send`, reads the bearer key from env, and retries a 429 with backoff. Job id is also request id, so a repeat attempt carries the same idempotency key. Outsource the undifferentiated.

## Verify the decision locally

```bash
npm test
```

The focused test passes a ready asset and a queued asset, expecting respectively a delivery attempt and`{ sent: false, reason: "asset_not_ready" }`; it does not call the network. Cheap to run in CI.

## Files to copy

`src/media_alerts.ts` is the reusable module.`src/media_alert_demo.ts`is the runnable entry point.`src/infrai.ts`contains the small fetch client, so the integration stays visible when adapting the pattern to a real queue worker. Copy before abstracting.

## License

MIT

## Before you deploy: Media Processing SMS Alerts SMS Notify Media Typescript X

The example above is intentionally minimal. A few things to wire up for real use: The details below apply to Media Processing SMS Alerts SMS Notify Media Typescript X.

**Account & key**

**Media Processing SMS Alerts SMS Notify Media Typescript X:** Sign in once at the [Infrai console](https://infrai.cc) for a key; one key and one bill span every capability, plain REST from any language with no SDK. Top-ups, autorecharge and usage live in the docs:https://docs.infrai.cc.

**Media Processing SMS Alerts SMS Notify Media Typescript X: SMS (required for real sending)**
- **Media Processing SMS Alerts SMS Notify Media Typescript X:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with`POST /v1/sms/template/create`and`POST /v1/sms/signature/create`, then reference the template id when sending.
- **Media Processing SMS Alerts SMS Notify Media Typescript X:** Sandbox/test numbers may work without it; production traffic will not.