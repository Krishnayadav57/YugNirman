import { getSettings } from "@/lib/db";
import AdminSettingsClient from "./AdminSettingsClient";

export default function AdminSettingsPage() {
  const settings = getSettings();
  return <AdminSettingsClient settings={settings} />;
}
