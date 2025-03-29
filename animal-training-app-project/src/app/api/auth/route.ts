// login api route
import connectDb from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schemas/user.schema";
import bcrypt from "bcrypt";
import { isValidEmail, isValidPassword } from "@/lib/credentialAuth";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    
    const { email, password } = await request.json();
    // FRONT END FORM VALIDATION 
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    // FRONT END FORM VALIDATION 
    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: "Please enter a valid password" },
        { status: 400 }
      );
    }

    // gets the user from the database
    // example case: valid email and password but user does not exist 
    // returns null if user does not exist 
    const user = await User.findOne({ email }); 

    // checks if user exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password"},
        {status: 401}
      );
    }

    // compares the password from the database with the password from the form 
    // returns boolean value 
    const validPassword = await bcrypt.compare(password, user.password);

    //
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password"},
        {status: 401}
      );
    }

    const { password: _, ...secureUser } = user.toObject();

    return NextResponse.json(secureUser);

    
  } catch (error) {
    console.error("Error while trying to login", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
