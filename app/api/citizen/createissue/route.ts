import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const body = await req.json();
    console.log(body);

    const textToCheck = `${body.subject} ${body.description} ${body.subTags.join(" ")}`; // Combine all relevant text

    const isSensitive = await checkSensitiveContent(textToCheck);

    if (isSensitive) {
      console.log("Issue contains sensitive content and cannot be created.")
      return NextResponse.json(
        { message: "Issue contains sensitive content and cannot be created." },
        { status: 400 }
      );

    }

    const issue = await prisma.issue.create({
      data: {
        userId: session.user.id,
        localityId: session.user.localityId,
        subject: body.subject,
        tagId: body.tagId,
        subTags: body.subTags,
        description: body.description,
      },
    });
    return NextResponse.json({
      message: "Issue created successfully",
      issue: { issue },
    });
  } catch (error: any) {
    console.error("Error creating issue:", error); // Log the full error for debugging
    return NextResponse.json({
      message: "Error",
      error: error.message, // Include error message for better debugging on client side.
    });
  }
}

async function checkSensitiveContent(text: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Is the following text sensitive, lewd, vulgar, or indecent? Answer with only "true" or "false".\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status, response.statusText);
      return false; // Return false or throw an error based on your error handling policy
    }

    const data = await response.json();

    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      const geminiResponse = data.candidates[0].content.parts[0].text.trim().toLowerCase();
      return geminiResponse === "true";
    } else {
        console.error("Unexpected Gemini API response structure:", data);
        return false; // Handle unexpected response structure
    }

  } catch (error: any) {
    console.error("Error checking sensitive content:", error);
    return false; // Return false or throw an error based on your error handling policy
  }
}