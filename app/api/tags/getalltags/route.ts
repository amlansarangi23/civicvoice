import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function GET(req : NextRequest){
    try{

            const session = await getServerSession(NEXT_AUTH_CONFIG);
        
            if (!session || !session.user) {
                return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
            }
        

        
        const tags = await prisma.tag.findMany({
            where:{
                localityId: session.user.localityId,
            }
        })
        return NextResponse.json({
            message: "Tags fetched",
            tags : tags
        });
        
    }
    catch(error: any)
    {
        console.log(error);
    }
}