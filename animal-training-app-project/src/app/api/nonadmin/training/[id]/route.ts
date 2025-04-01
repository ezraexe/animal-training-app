import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database"; 
import { TrainingLog } from "@/schemas/training-log.schema"; 

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    const userId = request.headers.get('user-id'); 

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required'}, 
        { status: 400}
      ); 
    }

    const bodyUpdates = await request.json(); 
    const id = await params.id; 

    const requiredFields = ['title', 'animal', 'hours', 'date', 'description'];
    for (const field of requiredFields) {
      if (!bodyUpdates[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required`}, 
          { status: 400 }
        );
      }
    }

    await connectDB(); 

    const existingLog = await TrainingLog.findOne({ 
      _id: id, 
      user: userId, 
    });

    if (!existingLog) {
      return NextResponse.json(
        { success: false, error: 'Training log not found'}, 
        { status: 404}
      ); 
    }

    const updatedLog = await TrainingLog.findByIdAndUpdate(
      id, 
      {
        title: bodyUpdates.title, 
        animal: bodyUpdates.animal, 
        hours: Number(bodyUpdates.hours), 
        date: new Date(bodyUpdates.date), 
        description: bodyUpdates.description, 
      }, 
      { 
        new: true,
        runValidators: true, 
      }
    ).populate({
      path: 'animal', 
      model: 'Animal', 
    }).populate({
      path: 'user', 
      model: 'User', 
      select: 'fullName'
    });

    return NextResponse.json({
      success: true, 
      data: updatedLog, 
    }, { status: 200}); 
    

  } catch (error) {
    console.error('Error updating training log:', error); 
    return NextResponse.json(
      { success: false, error: 'Failed to update training log'}, 
      { status: 500}
    ); 
  }
}