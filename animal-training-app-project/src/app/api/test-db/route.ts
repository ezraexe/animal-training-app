import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/schemas/user.schema';

export async function GET() {
  try {
    await connectDB();
    
    const testUser = await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      admin: false
    });

    await User.findByIdAndDelete(testUser._id);

    return NextResponse.json({ 
      message: 'Database connected successfully!',
      status: 'All operations working'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database', details: (error as Error).message }, 
      { status: 500 }
    );
  }
}