import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const {issueId, adminReply} = await req.json();

    if(issueId == null){
        return NextResponse.json({message: "IssueId not found"})
    }
  
    //db change
    try{
        const updatedIssue = await prisma.issue.update({
            where: {
              id: issueId,
            },
            data: {
              isResolved: true,
              adminReply: adminReply
              
            },
          })

          return NextResponse.json({
            message: "Issue Resolved",
            updatedIssue: updatedIssue
          });
    }
    catch (error: any) {
        return NextResponse.json({
          message: error,
        });
      } 
    
  }
  