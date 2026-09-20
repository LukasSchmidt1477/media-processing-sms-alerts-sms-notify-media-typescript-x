import assert from "node:assert/strict";
import { queueAsset, notifyCreator } from "./media_alerts.js";

const job = queueAsset({ assetId: "asset-test", creatorPhone: "+15551234567", title: "Preview" });
assert.equal(job.state, "ready");
const pending = await notifyCreator({ ...job, state: "queued" });
assert.deepEqual(pending, { sent: false, reason: "asset_not_ready" });
console.log("media alert decision test passed");
