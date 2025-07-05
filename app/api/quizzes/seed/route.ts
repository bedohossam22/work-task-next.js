import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Quiz from '@/models/Quiz'

export async function GET() {
  await dbConnect()

  await Quiz.deleteMany({})

  const sampleQuizzes = [
    {
      title: "Basic Math",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5"],
          correctAnswer: 1
        },
        {
          text: "What is 5 × 3?",
          options: ["10", "15", "20"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "JavaScript Basics",
      questions: [
        {
          text: "Which keyword declares a variable?",
          options: ["var", "function", "class"],
          correctAnswer: 0
        }
      ]
    }
  ]

  await Quiz.insertMany(sampleQuizzes)

  return NextResponse.json({ success: true })
}