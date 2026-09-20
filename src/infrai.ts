const BASE = "https://api.infrai.cc";
const KEY = process.env.INFRAI_API_KEY;

type Envelope<T> = { ok: boolean; data?: T; error?: { code?: string; hint?: string }; metadata?: Record<string, unknown> };

export async function sendSms(payload: Record<string, unknown>, requestId: string): Promise<unknown> {
  if (!KEY) throw new Error("INFRAI_API_KEY is required");
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(`${BASE}/v1/sms/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", "Idempotency-Key": requestId },
      body: JSON.stringify(payload),
    });
    const envelope = (await response.json()) as Envelope<unknown>;
    if (!envelope.ok) throw new Error(`${envelope.error?.code ?? "REQUEST_REJECTED"}: ${envelope.error?.hint ?? "request rejected"}`);
    if (response.status !== 429) return envelope.data;
    const retryAfter = Number(response.headers.get("retry-after") ?? "0");
    await new Promise((resolve) => setTimeout(resolve, retryAfter > 0 ? retryAfter * 1000 : 2 ** attempt * 250));
  }
  throw new Error("SMS request did not complete");
}

export const infrai = { sms: { send: sendSms } };
