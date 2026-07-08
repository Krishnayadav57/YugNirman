import { getMessages } from "@/lib/db";
import { markMessageReadAction, removeMessageAction } from "@/lib/actions";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Messages</h1>
      <p className="text-muted text-sm mb-8">Messages submitted through the contact form.</p>

      {messages.length === 0 ? (
        <p className="text-muted text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`rounded-2xl border bg-card p-6 ${m.read ? "border-border" : "border-accent/50"}`}>
              <div className="flex flex-wrap justify-between gap-4 items-start">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {m.subject}
                    {!m.read && <span className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="text-muted text-sm mt-1">{m.name} · {m.email}</div>
                  <p className="text-sm mt-3 max-w-xl">{m.message}</p>
                  <div className="text-muted text-xs mt-3">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <form action={markMessageReadAction.bind(null, m.id, !m.read)}>
                    <button type="submit" className="text-xs text-accent font-semibold">
                      Mark as {m.read ? "unread" : "read"}
                    </button>
                  </form>
                  <form action={removeMessageAction.bind(null, m.id)}>
                    <button type="submit" className="text-xs text-red-400 font-semibold">Delete</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
