import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database"; 
import { TrainingLog } from "@/schemas/training-log.schema"; 
import { Animal } from "@/schemas/animal.schema"; 

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      ); 
    }

    await connectDB(); 

    const trainingLogs = await TrainingLog
    .find({ user: userId })
    .populate({
      path: 'animal', 
      model: 'Animal', 
    })
    .populate({
      path: 'user', 
      model: 'User', 
      select: 'fullName'
    })
    .sort({ date: -1}) 
    .exec(); 
    
    return NextResponse.json({ success: true, data: trainingLogs}, {status: 200}); 
    
  } catch (error) {
    console.error('Error fetching training logs:', error); 
    return NextResponse.json(
      { success: false, error: 'Failed to fetch training logs'}, 
      { status: 500}
    ); 
  }
}

export async function POST(request : NextRequest) {
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) { 
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        {status: 400} 
      )
    }

    const body = await request.json(); 

    const requiredFields = ['title', 'animal', 'hours', 'date', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required`}, 
          { status: 400}
        ); 
      }
    }

    await connectDB(); 

    const trainingLogs = await TrainingLog.create({
      user: userId, 
      animal: body.animal, 
      title: body.title, 
      date: body.date, 
      description: body.description, 
      hours: body.hours, 
    }); 
    
    const populatedTrainingLog = await TrainingLog
    .findById(trainingLogs._id)
    .populate({
      path: 'animal', 
      model: 'Animal', 
    });

    return NextResponse.json({success: true, data: populatedTrainingLog}, {status: 201}); 
  } catch (error) {
    console.error('Error creating training log:', error); 
    return NextResponse.json(
      { success: false, error: 'Failed to create training log'}, 
      { status: 500}
    ); 
  }
}