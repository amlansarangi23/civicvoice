import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const tagId = req.nextUrl.searchParams.get("tagId");

    if (tagId == null) {
      return NextResponse.json({
        message: "tagId not recieved",
      });
    }
    const issues = await prisma.issue.findMany({
      where: {
        tagId: tagId,
      },
      include:{
        upvoters: true
      }
    });
    return NextResponse.json({
      message: "Issue fetched",
      issues: issues,
    });
  } catch (error: any) {
    console.log(error);
  }
}
