import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getSiteSettings, updateSiteSettings } from "@/lib/settingsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const ALLOWED_TEAM_ROLES = new Set([
  "admin",
  "content_manager",
  "editor",
  "analyst",
  "support",
  "viewer"
]);

function validateSettingsPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid settings payload.";
  }

  if (!String(payload.brandName || "").trim()) {
    return "brandName is required.";
  }

  if (!String(payload.heroHeading || "").trim()) {
    return "heroHeading is required.";
  }

  if (!Array.isArray(payload.services) || payload.services.length === 0) {
    return "At least one service is required.";
  }

  if (!Array.isArray(payload.faqs) || payload.faqs.length === 0) {
    return "At least one FAQ is required.";
  }

  if (!Array.isArray(payload.navItems) || payload.navItems.length === 0) {
    return "At least one navigation item is required.";
  }

  if (String(payload.heroHeading).trim().length > 140) {
    return "Hero heading must be 140 characters or less.";
  }

  if (String(payload.heroSubheading || "").trim().length > 280) {
    return "Hero subheading must be 280 characters or less.";
  }

  if (String(payload.whatsappMessage || "").trim().length > 280) {
    return "WhatsApp message must be 280 characters or less.";
  }

  if (payload.teamUsers !== undefined) {
    if (!Array.isArray(payload.teamUsers)) {
      return "teamUsers must be an array.";
    }
    for (const user of payload.teamUsers) {
      if (!user || typeof user !== "object") {
        return "Each team user must be an object.";
      }
      const email = String(user.email || "").trim();
      if (!email) {
        return "Each team user must have an email.";
      }
      if (email.length > 254) {
        return "Team user email is too long.";
      }
      const name = String(user.name || "").trim();
      const role = String(user.role || "").trim();
      if (name.length > 120) {
        return "Team user name is too long.";
      }
      if (role.length > 80) {
        return "Team user role is too long.";
      }
      if (role && !ALLOWED_TEAM_ROLES.has(role)) {
        return "Invalid team user role.";
      }
    }
  }

  return null;
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const { teamUsers: _teamUsers, ...publicSettings } = settings;
    return NextResponse.json(
      { settings: publicSettings },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const validationError = validateSettingsPayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const settings = await updateSiteSettings(payload);
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to save settings. Persistent storage is unavailable in production runtime. Configure a managed database."
      },
      { status: 500 }
    );
  }
}
