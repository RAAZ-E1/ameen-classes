// MongoDB Playground for Ameen Classes Question Database
// Use this playground to test MongoDB operations

// Select the database
use('ameen-classes');

// Sample question document with correct schema matching your structure
const sampleQuestion = {
  "class": 11,
  "subject": "Biology",
  "chapter": "The Living World",
  "questionText": "Who is known as the father of taxonomy?",
  "options": ["Darwin", "Linnaeus", "Aristotle", "Mendel"],
  "correctAnswer": 1,
  "explanation": "Linnaeus is called the father of taxonomy.",
  "difficulty": "easy",
  "tags": ["taxonomy", "scientist"]
};

// Insert a sample question
db.questions.insertOne(sampleQuestion);

// Query to find all Class 11 Biology questions
db.questions.find({
  "class": 11,
  "subject": "Biology"
});

// Query to find questions by difficulty
db.questions.find({
  "difficulty": "easy"
});

// Query to find questions by chapter
db.questions.find({
  "subject": "Biology",
  "chapter": "The Living World"
});

// Query to count questions by subject
db.questions.aggregate([
  {
    $group: {
      _id: "$subject",
      count: { $sum: 1 }
    }
  }
]);

// Query to count questions by class and subject
db.questions.aggregate([
  {
    $group: {
      _id: { class: "$class", subject: "$subject" },
      count: { $sum: 1 }
    }
  }
]);

// Create indexes for better performance
db.questions.createIndex({ "class": 1, "subject": 1 });
db.questions.createIndex({ "subject": 1, "chapter": 1 });
db.questions.createIndex({ "difficulty": 1 });
db.questions.createIndex({ "tags": 1 });

// Sample test result document
const sampleTestResult = {
  "exam_type": "NEET",
  "total_questions": 50,
  "correct_answers": 35,
  "time_taken": 3600, // seconds
  "subject_scores": {
    "Physics": { "correct": 12, "total": 15 },
    "Chemistry": { "correct": 11, "total": 15 },
    "Biology": { "correct": 12, "total": 20 }
  },
  "answers": [
    {
      "question_id": ObjectId(), // Reference to question
      "selected_answer": 1,
      "is_correct": true
    }
    // ... more answers
  ],
  "created_at": new Date()
};

// Insert sample test result
db.testresults.insertOne(sampleTestResult);

// Query to find recent test results
db.testresults.find().sort({ "created_at": -1 }).limit(10);