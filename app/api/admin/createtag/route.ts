import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await req.json();
    const tag = await prisma.tag.create({
      data: {
        title: body.title,
        localityId: session.user.localityId,
      },
    });

    return NextResponse.json({
      message: "Tag created successfully",
      tag: { tag },
    });
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
}
