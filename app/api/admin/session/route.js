import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const isAdmin = await isAdminAuthenticated();
    return NextResponse.json({ isAdmin: Boolean(isAdmin) });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
