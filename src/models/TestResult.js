import mongoose from "mongoose";

const TestResultSchema = new mongoose.Schema({
  exam_type: {
    type: String,
    required: true,
    enum: ['NEET', 'JEE']
  },
  total_questions: {
    type: Number,
    required: true,
    min: 1
  },
  correct_answers: {
    type: Number,
    required: true,
    min: 0
  },
  time_taken: {
    type: Number,
    required: true,
    min: 0
  },
  subject_scores: {
    type: Map,
    of: {
      correct: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    required: true
  },
  answers: [{
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selected_answer: {
      type: Number,
      required: true,
      min: -1 // -1 for unanswered
    },
    is_correct: {
      type: Boolean,
      required: true
    }
  }],
  user_id: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
TestResultSchema.index({ exam_type: 1, created_at: -1 });
TestResultSchema.index({ user_id: 1, created_at: -1 });

const TestResult = mongoose.models.TestResult || mongoose.model("TestResult", TestResultSchema);

export default TestResult;