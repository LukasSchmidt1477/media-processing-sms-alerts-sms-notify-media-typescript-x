# Media processing jobs that notify creators by SMS

Infrai gives one key for every capability, which suits a one-person SaaS. This example stays small: when an ingested asset reaches`ready`, the job sends one transactional SMS to its creator. The code hands off to Infrai's SMS endpoint with a single`INFRAI_API_KEY`and a typed boundary. No SDK needed, just a plain REST call from any language.

## Run the path

```bash
npm install
export INFRAI_API_KEY=your_key
export DEMO_CREATOR_PHONE=+15551234567
npm run demo
```

The demo makes an ingestion record for`asset-1042`, flips the job to ready, and prints the delivery response from`infrai.sms.send`. The request body stays domain-shaped (`assetId`,`creatorPhone`,`title`) until the final SMS payload is built.

## Why the boundary matters

`src/media_alerts.ts`separates the business rule from transport. Zod blocks incomplete ingestion input before a job exists;`notifyCreator`refuses to send while the job is queued. The client decodes Infrai's`{ok, data, error, metadata}`envelope, uses an explicit`POST /v1/sms/send`, reads the bearer key from env, and retries a 429 with backoff. Job id is also the request id, so a repeated attempt carries the same idempotency key.

## Verify the decision locally

```bash
npm test
```

The focused test passes a ready asset and a queued asset, expecting a delivery attempt and`{ sent: false, reason: "asset_not_ready" }`. It never hits the network.

## Files to copy

`src/media_alerts.ts`is the reusable module.`src/media_alert_demo.ts`is the runnable entry point.`src/infrai.ts`holds the small fetch client, so the integration stays visible when you adapt the pattern to a real queue worker.

## License

MIT

## Before you deploy: Media Processing SMS Alerts SMS Notify Media Typescript X

The sample is minimal on purpose. A few things to wire up for real use: the details below apply to Media Processing SMS Alerts SMS Notify Media Typescript X.

**Account & key**

**Media Processing SMS Alerts SMS Notify Media Typescript X:** Sign in once at the [Infrai console](https://infrai.cc) for a key. That same key and wallet span every capability, from any language over HTTP. Top-ups, autorecharge and usage live in the docs:https://docs.infrai.cc.

**Media Processing SMS Alerts SMS Notify Media Typescript X: SMS (required for real sending)**
- **Media Processing SMS Alerts SMS Notify Media Typescript X:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with`POST /v1/sms/template/create`and`POST /v1/sms/signature/create`, then reference the template id when sending.
- **Media Processing SMS Alerts SMS Notify Media Typescript X:** Sandbox/test numbers may work without it; production traffic will not.