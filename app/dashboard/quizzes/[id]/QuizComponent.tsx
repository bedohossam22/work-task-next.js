'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizComponent({ quiz }: { quiz: any }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Debug: Log the received quiz data
  console.log('Quiz Data:', quiz);

  const handleNext = () => {
    if (selectedOption === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p>Your score: {score}/{quiz.questions.length}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Question {currentQuestion + 1}: {currentQ.text}
        </h3>
        
        <div className="space-y-2">
          {currentQ.options.map((option: string, index: number) => (
            <div 
              key={index}
              className={`p-3 border rounded cursor-pointer ${
                selectedOption === index ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedOption(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full py-2 rounded ${
          selectedOption === null 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}