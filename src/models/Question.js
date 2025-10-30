import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  class: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Biology', 'Mathematics']
  },
  chapter: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 2 && v.length <= 6;
      },
      message: 'Options must have between 2 and 6 choices'
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  explanation: {
    type: String,
    required: false
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: {
    type: [String],
    required: false,
    default: []
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Create indexes for better query performance
QuestionSchema.index({ class: 1, subject: 1 });
QuestionSchema.index({ subject: 1, chapter: 1 });
QuestionSchema.index({ difficulty: 1 });
QuestionSchema.index({ tags: 1 });

const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export default Question;
