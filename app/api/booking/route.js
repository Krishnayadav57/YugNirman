import { NextResponse } from "next/server";
import { z } from "zod";
import { addBooking, getServices } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendNotificationEmail, bookingNotificationHtml } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  company: z.string().max(150).optional().or(z.literal("")),
  serviceId: z.string().min(1),
  budget: z.string().max(60).optional().or(z.literal("")),
  timeline: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(3000).optional().or(z.literal("")),
});

export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`booking:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const services = getServices();
    const service = services.find((s) => s.id === parsed.data.serviceId);
    if (!service) {
      return NextResponse.json({ error: "Unknown service" }, { status: 400 });
    }
    const record = addBooking(parsed.data);
    sendNotificationEmail({
      subject: `New booking: ${service.title}`,
      html: bookingNotificationHtml(parsed.data, service.title),
    }).catch(() => {});
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
