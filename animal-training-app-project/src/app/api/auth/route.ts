// login api route
import connectDb from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schemas/user.schema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    
    
  } catch (error) {
    console.error("Error while trying to login", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
