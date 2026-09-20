import { z } from "zod";
import { infrai } from "./infrai.js";

export const ingestionRequest = z.object({ assetId: z.string().min(1), creatorPhone: z.string().min(7), title: z.string().min(1) });
export type IngestionRequest = z.infer<typeof ingestionRequest>;

export type MediaJob = IngestionRequest & { jobId: string; state: "queued" | "ready" };

export function queueAsset(input: unknown): MediaJob {
  const request = ingestionRequest.parse(input);
  return { ...request, jobId: `job-${request.assetId}`, state: "ready" };
}

export async function notifyCreator(job: MediaJob) {
  if (job.state !== "ready") return { sent: false, reason: "asset_not_ready" } as const;
  const data = await infrai.sms.send({ to: job.creatorPhone, body: `Media asset ${job.title} is ready for review.` }, job.jobId);
  return { sent: true, jobId: job.jobId, data } as const;
}
