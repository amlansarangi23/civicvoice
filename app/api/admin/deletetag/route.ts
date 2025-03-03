import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

export async function DELETE(req: NextRequest) {
  try {
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
