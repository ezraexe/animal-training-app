import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database"; 
import { Animal } from "@/schemas/animal.schema";
import { User } from "@/schemas/user.schema";


// get function to get animal 
// post function to create animal 
export async function GET(request : NextRequest) { 
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      )
    }

    await connectDB(); 

    const animals = await Animal
    .find({ owner: userId}) 
    .populate({
      path: 'owner', 
      model: 'User', 
      select: 'fullName -_id'
    })
    .sort({ date: -1}) 
    .exec(); 

    return NextResponse.json({ success: true, data: animals}, {status: 200}); 

  } catch (error) { 
    console.error('Error fetching animals:', error); 
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animals'}, 
      { status: 500}
    )
  }

}

export async function POST(request: NextRequest) { 
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      )
    }

    const body = await request.json(); 

    const requiredFields = ['name', 'breed', 'owner'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required`}, 
          { status: 400}
        );
      }
    }

    
    await connectDB(); 

    const animal = await Animal.create({
      name: body.name, 
      breed: body.breed, 
      owner: userId, 
      hoursTrained: body.hoursTrained || 0, 
      profilePicture: body.profilePicture || '', 
    })

    const populatedAnimal = await Animal.findById(animal._id)
    .populate({
      path: 'owner', 
      model: 'User', 
      select: 'fullName -_id'
    }); 

    return NextResponse.json({success: true, data: populatedAnimal}, {status: 200}); 
    

    
  } catch (error) { 
    console.error('Error creating animal:', error); 
    return NextResponse.json(
      { success: false, error: 'Failed to create animal'}, 
      { status: 500}
    );
  }

}