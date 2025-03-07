import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

export async function GET(req : NextRequest){
    try{
        const issueId = req.nextUrl.searchParams.get('issueId');

        if(issueId == null){
            return NextResponse.json({
                message: "tagId not recieved"
            });
        }
        const issue = await prisma.issue.findFirst({
            where:{
                id: issueId
            },
            include:{
                upvoters: true,
            }
        })
        return NextResponse.json({
            message: "Issue fetched",
            issue : issue
        });
        
    }
    catch(error: any)
    {
        console.log(error);
    }
}