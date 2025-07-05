import { connectDB } from '@/lib/dbConnect';
import Announcement from '@/models/Announcement';
import { NextResponse } from 'next/server';

// GET all announcements
export async function GET() {
  await connectDB();
  const announcements = await Announcement.find().sort('-createdAt');
  return NextResponse.json(announcements);
}

// POST new announcement
export async function POST(request: Request) {
  await connectDB();
  const { title, content } = await request.json();
  const announcement = await Announcement.create({ title, content });
  return NextResponse.json(announcement, { status: 201 });
}

// PUT update announcement
export async function PUT(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { title, content } = await request.json();
  
  const updated = await Announcement.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  
  return NextResponse.json(updated);
}

// DELETE announcement
export async function DELETE(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await Announcement.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}