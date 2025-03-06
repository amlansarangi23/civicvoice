import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
    
    const { tagId } = await req.json();

    if (tagId == null) {
      return NextResponse.json({
        message: "tagId not recieved",
      });
    }
    const deletedIssue = await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });
    return NextResponse.json({
      message: "Tag deleted",
      deletedIssue: deletedIssue,
    });
  } 
  catch (error: any) {
    return NextResponse.json({
      message: error,
    });
  }
}
