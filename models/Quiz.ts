import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  questions: [{
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models?.Quiz || mongoose.model('Quiz', quizSchema);