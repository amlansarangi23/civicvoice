import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

export async function DELETE(req: NextRequest) {
  try {
    const { issueId } = await req.json();

    if (issueId == null) {
      return NextResponse.json({
        message: "issueId not recieved",
      });
    }
    const deletedIssue = await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });
    return NextResponse.json({
      message: "Issue deleted",
      deletedIssue: deletedIssue,
    });
  } 
  catch (error: any) {
    return NextResponse.json({
      message: error,
    });
  }
}
