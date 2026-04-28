import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getStorageHealth } from "@/lib/settingsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const health = await getStorageHealth();
    return NextResponse.json(health, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
    });
  } catch {
    return NextResponse.json({ ok: false, backend: "none", error: "Health check failed." }, { status: 500 });
  }
}
