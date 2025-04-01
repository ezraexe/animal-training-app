import connectDB from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schemas/user.schema";
import { Animal } from "@/schemas/animal.schema";


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
        { success: false, error: 'Need Administrator Access'}, 
        { status: 400 }
      );
    }

    const animals = await Animal
    .find()
    .populate({
      path: 'owner', 
      model: 'User', 
      select: 'fullName' 
    })
    .lean() 
    .exec() 

    return NextResponse.json(
      {
        success: true, 
        data: animals,
      }
    );
    
  } catch (error) {
    console.error('Error fetching animals:', error); 
    return NextResponse.json(
      { success: false, error: 'Internal Server Error'}, 
      { status: 500} 
    )
  }
}