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
    const body = await req.json();
    console.log(body);
    const issue = await prisma.issue.create({
      data: {
        userId: session.user.id,
        localityId: session.user.localityId,
        // userId: body.userId,
        // localityId: body.localityId,
        subject: body.subject,
        tagId: body.tagId,
        subTags: body.subTags,
        description: body.description,
      },
    });
    return NextResponse.json({
      message: "Issue created successfully",
      issue: { issue },
    });
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({
      message: "Error",
    });
  }
}
