import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, locality, type } = await req.json();

    // Validation (ensure all fields are present)
    if (!username || !email || !password || !locality || !type) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    let newlocality = locality.toLowerCase();

    // First, check if the locality exists
    let localityRecord = await prisma.locality.findUnique({
      where: { name: newlocality },
    });

    // If the locality doesn't exist, create it
    if (!localityRecord) {
      localityRecord = await prisma.locality.create({
        data: {
          name: newlocality,
        },
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Save the hashed password
        localityId: localityRecord.id, // Linking the user to the locality
        type: type, // Default user type
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error.message || error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
