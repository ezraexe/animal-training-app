import connectDB from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schemas/user.schema";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      )
    }

    await connectDB(); 

    const isAdmin = await User.exists({ _id: userId, isAdmin: true});

    if (!isAdmin) {
      return NextResponse.json(
        { success : false, error: 'Need Administrator Access'}, 
        { status: 400 }
      )
    }

    const users = await User
    .find()
    .select('-password')
    .lean()
    .exec(); 

    return NextResponse.json({ success: true, data: users}, { status: 200}); 
    
    
  } catch (error) {
    return NextResponse.json(
      { success : false, 
        error: 'Couldn\'t fetch users', 
      },
      { status: 500 }
    )
  }
}