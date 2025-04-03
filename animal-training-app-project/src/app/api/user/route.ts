// signup api route
// test commit 
import connectDb from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schemas/user.schema";
import bcrypt from "bcrypt";
import { isValidEmail, isValidPassword } from "@/lib/credentialAuth";

interface UserData {
  fullName: string;
  email: string;
  password: string;
  admin?: boolean;
}

const validateUserData = (data: Partial<UserData>) => {
  if (!data.fullName || !data.email || !data.password) {
    return NextResponse.json(
      { error: "Missing Required Fields" },
      { status: 400 }
    );
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "Invalid Email Address" },
      { status: 400 }
    );
  }

  if (!isValidPassword(data.password)) {
    return NextResponse.json(
      {
        error:
          "Password is invalid. Must contain at least 6 characters",
      },
      { status: 400 }
    );
  }

  return null; // validation passed
};

const createUser = async (user: UserData) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await User.create({
    ...user,
    password: hashedPassword,
    admin: user.admin || false,
  });

  const { password: _, ...userWithoutPassword } = newUser.toObject();

  return NextResponse.json(
    {
      success: true,
      data: userWithoutPassword,
    },
    { status: 201 }
  );
};

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const data = await request.json();
    console.log(data);

    const validationError = validateUserData(data); // make function
    if (validationError) {
      return validationError;
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "A user already exists within this email address" },
        { status: 400 }
      );
    }

    const newUser = await createUser(data); // make function

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while trying to signup", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while trying to signup",
      },
      { status: 500 }
    );
  }
}
