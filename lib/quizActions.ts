import { connectDB } from '@/lib/dbConnect';
import mongoose from 'mongoose';

export async function getQuiz(id: string) {
  await connectDB();
  return mongoose.models.Quiz?.findById(id).lean() || null;
}