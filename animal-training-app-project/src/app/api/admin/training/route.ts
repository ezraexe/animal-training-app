import connectDB from "@/lib/database"; 
import {NextRequest, NextResponse} from "next/server"; 
import { TrainingLog } from "@/schemas/training-log.schema"; 
import { User } from "@/schemas/user.schema";


// Create a GET endpoint at /api/admin/training which will return all of the training logs in the database

export async function GET( request: NextRequest) {
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      )
    }

    await connectDB(); 

    const isAdmin = await User.exists({ _id: userId, admin: true}); 

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Need Administrator Access'}, 
        { status: 400}
      )
    }

    const trainingLogs = await TrainingLog
    .find()
    .populate({
      path: 'user', 
      model: 'User', 
      select: 'fullName'
    })
    .populate({
      path: 'animal', 
      model: 'Animal', 
    })
    .sort({ date: -1 })
    .lean()
    .exec(); 

    return NextResponse.json(
      { success: true, data: trainingLogs}, 
      { status: 200}
    )
      
    
  } catch {
    return NextResponse.json(
      { success: false, error: 'Couldn\'t fetch training logs'}, 
      { status: 500}
    )
  }
}