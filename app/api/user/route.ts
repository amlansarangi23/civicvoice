import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Ensure proper return of expected fields
  return NextResponse.json({
    id: session.user.id, // Make sure this is included in the session callback
    username: session.user.username,
    email: session.user.email,
    localityId: session.user.localityId,
    localityName: session.user.localityName
  });
}
