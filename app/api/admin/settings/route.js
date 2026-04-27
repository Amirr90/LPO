import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getSiteSettings, updateSiteSettings } from "@/lib/settingsStore";

export const runtime = "nodejs";

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
    return NextResponse.json({ settings });
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
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }
}
