import { connectDB } from '@/lib/dbConnect';
import Quiz from '@/models/Quiz';
import { NextResponse } from 'next/server';

// GET all quizzes
export async function GET() {
  await connectDB();
  const quizzes = await Quiz.find().sort('-createdAt');
  return NextResponse.json(quizzes);
}

// POST new quiz
export async function POST(request: Request) {
  await connectDB();
  const { title, questions } = await request.json();
  const quiz = await Quiz.create({ title, questions });
  return NextResponse.json(quiz, { status: 201 });
}

// PUT update quiz
export async function PUT(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { title, questions } = await request.json();
  
  const updated = await Quiz.findByIdAndUpdate(
    id,
    { title, questions },
    { new: true }
  );
  
  return NextResponse.json(updated);
}

// DELETE quiz
export async function DELETE(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await Quiz.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}