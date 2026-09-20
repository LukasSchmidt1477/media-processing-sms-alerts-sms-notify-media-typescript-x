import { queueAsset, notifyCreator } from "./media_alerts.js";

const phone = process.env.DEMO_CREATOR_PHONE;
if (!phone) throw new Error("DEMO_CREATOR_PHONE is required");
const job = queueAsset({ assetId: "asset-1042", creatorPhone: phone, title: "City lights trailer" });
console.log("processing job:", job);
console.log("creator delivery:", await notifyCreator(job));
