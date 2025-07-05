import { getQuiz } from '@/lib/quizActions';
import QuizComponent from './QuizComponent';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id);
  
  if (!quiz) {
    return <div className="p-4 text-red-500">Quiz not found</div>;
  }

  return <QuizComponent quiz={JSON.parse(JSON.stringify(quiz))} />;
}