import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSiteSettings } from "@/lib/settingsStore";
import AdminSettingsForm from "./AdminSettingsForm";

export const runtime = "nodejs";

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();
  return <AdminSettingsForm initialSettings={settings} />;
}
