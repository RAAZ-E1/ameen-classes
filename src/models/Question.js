import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  examType: {
    type: String,
    required: true,
    enum: ['NEET', 'JEE', 'CBSE'],
    index: true
  },
  class: {
    type: Number,
    required: true,
    enum: [11, 12],
    index: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
    index: true
  },
  chapter: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length === 4 && arr.every(option => option.trim().length > 0);
      },
      message: 'Must have exactly 4 non-empty options'
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  explanation: {
    type: String,
    default: '',
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'questions'
});

// Compound indexes for better query performance
QuestionSchema.index({ examType: 1, subject: 1, class: 1 });
QuestionSchema.index({ examType: 1, difficulty: 1 });
QuestionSchema.index({ subject: 1, chapter: 1 });

// Update the updatedAt field before saving
QuestionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to get questions by criteria
QuestionSchema.statics.findByCriteria = function(criteria, limit = 50) {
  const query = { isActive: true };
  
  if (criteria.examType) query.examType = criteria.examType;
  if (criteria.subject) query.subject = { $in: Array.isArray(criteria.subject) ? criteria.subject : [criteria.subject] };
  if (criteria.class) query.class = { $in: Array.isArray(criteria.class) ? criteria.class : [criteria.class] };
  if (criteria.difficulty) query.difficulty = criteria.difficulty;
  if (criteria.chapter) query.chapter = criteria.chapter;
  
  return this.find(query).limit(limit).sort({ createdAt: -1 });
};

// Instance method to get similar questions
QuestionSchema.methods.getSimilar = function(limit = 5) {
  return this.constructor.find({
    _id: { $ne: this._id },
    subject: this.subject,
    chapter: this.chapter,
    isActive: true
  }).limit(limit);
};

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;