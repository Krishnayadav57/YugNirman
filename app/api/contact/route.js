import { NextResponse } from "next/server";
import { z } from "zod";
import { addMessage } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendNotificationEmail, messageNotificationHtml } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(3000),
});

export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const record = await addMessage(parsed.data);
    sendNotificationEmail({
      subject: `New message: ${parsed.data.subject}`,
      html: messageNotificationHtml(parsed.data),
    }).catch(() => {});
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
