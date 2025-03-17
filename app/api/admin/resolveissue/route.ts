import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function PUT(req: NextRequest) {
  const { issueId, adminReply, adminImageUrls } = await req.json();
  const resend = new Resend("re_bXmRF6H7_Hp1FD584W16iwc6YyTyV6uP8");

  if (issueId == null) {
    return NextResponse.json({ message: "IssueId not found" });
  }

  console.log(issueId);

  //db change
  try {
    const updatedIssue = await prisma.issue.update({
      where: {
        id: issueId[0],
      },
      data: {
        isResolved: true,
        adminReply: adminReply,
        adminImageUrls: adminImageUrls,
      },
    });

    const userId = updatedIssue.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User doest not exist",
      });
    }

    const email = user.email;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: `<p>Your Issue <strong>${updatedIssue.subject}</strong> has been resolved!</p>`,
    });

    return NextResponse.json({
      message: "Issue Resolved",
      updatedIssue: updatedIssue,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error,
    });
  }
}
