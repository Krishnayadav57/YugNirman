import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendNotificationEmail({ subject, html }) {
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM_EMAIL || "YugNirman <notifications@yugnirman.com>";

  if (!resend || !to) {
    console.log("[email] Skipped (RESEND_API_KEY or NOTIFY_EMAIL not set). Would have sent:", subject);
    return { skipped: true };
  }

  try {
    await resend.emails.send({ from, to, subject, html });
    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
    return { error: true };
  }
}

export function bookingNotificationHtml(booking, serviceTitle) {
  return `
    <h2>New booking request</h2>
    <p><strong>Service:</strong> ${serviceTitle}</p>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    ${booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : ""}
    ${booking.budget ? `<p><strong>Budget:</strong> ${booking.budget}</p>` : ""}
    ${booking.timeline ? `<p><strong>Timeline:</strong> ${booking.timeline}</p>` : ""}
    ${booking.message ? `<p><strong>Message:</strong><br/>${booking.message}</p>` : ""}
  `;
}

export function messageNotificationHtml(message) {
  return `
    <h2>New contact message</h2>
    <p><strong>From:</strong> ${message.name} (${message.email})</p>
    <p><strong>Subject:</strong> ${message.subject}</p>
    <p><strong>Message:</strong><br/>${message.message}</p>
  `;
}
