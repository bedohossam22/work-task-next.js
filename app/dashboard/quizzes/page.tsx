'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ 
    title: '', 
    questions: [{ text: '', options: ['', ''], correctAnswer: 0 }] 
  });

  // Load quizzes
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const res = await fetch('/api/quizzes');
    setQuizzes(await res.json());
  };

  const handleCreate = async () => {
    await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuiz)
    });
    fetchQuizzes();
    setNewQuiz({ 
      title: '', 
      questions: [{ text: '', options: ['', ''], correctAnswer: 0 }] 
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/quizzes?id=${id}`, { method: 'DELETE' });
    fetchQuizzes();
  };

  return (
    <div className="p-4 bg-black">
      <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
      
      {/* Create Form */}
      <div className="mb-8 p-4 border rounded-lg bg-black">
        <input
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
          className="w-full p-2 mb-4 border rounded"
        />
        
        {newQuiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4 p-4 border rounded">
            <input
              placeholder="Question"
              value={q.text}
              onChange={(e) => {
                const updatedQuestions = [...newQuiz.questions];
                updatedQuestions[qIndex].text = e.target.value;
                setNewQuiz({...newQuiz, questions: updatedQuestions});
              }}
              className="w-full p-2 mb-2 border rounded"
            />
            
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center mb-1">
                <input
                  type="radio"
                  checked={q.correctAnswer === optIndex}
                  onChange={() => {
                    const updatedQuestions = [...newQuiz.questions];
                    updatedQuestions[qIndex].correctAnswer = optIndex;
                    setNewQuiz({...newQuiz, questions: updatedQuestions});
                  }}
                  className="mr-2"
                />
                <input
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const updatedQuestions = [...newQuiz.questions];
                    updatedQuestions[qIndex].options[optIndex] = e.target.value;
                    setNewQuiz({...newQuiz, questions: updatedQuestions});
                  }}
                  className="flex-1 p-1 border rounded"
                />
              </div>
            ))}
          </div>
        ))}

        <button 
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Quiz
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid gap-4 ">
        {quizzes.map(quiz => (
          <div key={quiz._id} className="p-4 border rounded-lg">
            <h2 className="font-bold">{quiz.title}</h2>
            <p>{quiz.questions.length} questions</p>
            <div className="flex gap-2 mt-2">
              <Link 
                href={`/dashboard/quizzes/${quiz._id}`}
                className="text-blue-500 hover:underline"
              >
                Take Quiz
              </Link>
              <button 
                onClick={() => handleDelete(quiz._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}