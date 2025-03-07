import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    const { issueId } = await req.json();

    if(issueId == null){
        return NextResponse.json({message: "IssueId not found"})
    }
  
    //db change
    try{
        const updatedupvote = await prisma.upvotes.create({
            data: {
              issueId: issueId,
              userId: session.user.id
            },
          })

          return NextResponse.json({
            message: "Issue Updated",
            updatedIssue: updatedupvote
          });
    }
    catch (error: any) {
        return NextResponse.json({
          message: error,
        });
      } 
    
  }
  