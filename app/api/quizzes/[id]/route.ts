import { connectDB } from '@/lib/dbConnect';
import Quiz from '@/models/Quiz';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const quiz = await Quiz.findById(params.id).lean();
  
  if (!quiz) {
    return NextResponse.json(
      { error: "Quiz not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(quiz);
}