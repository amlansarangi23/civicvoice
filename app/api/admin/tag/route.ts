import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

export async function POST(req : NextRequest){
    try{
        const body = await req.json();
        const tag = await prisma.tag.create({
            data:{
                title:body.title
            }
        })
        return NextResponse.json({
            message: "Tag created successfully",
            tag : {tag}
        });
        
    }
    catch(error: any)
    {
        console.log(error);
    }
}