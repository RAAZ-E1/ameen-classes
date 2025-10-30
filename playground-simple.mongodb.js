// MongoDB Playground - Simple Version
// This file demonstrates basic MongoDB operations for your questions database

// Select the database
use('ameen-classes');

// Sample question document
const question = {
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

// Insert the question
db.questions.insertOne(question);

// Find all questions
db.questions.find();

// Count total questions
db.questions.countDocuments();

// Find Biology questions
db.questions.find({ "subject": "Biology" });

// Find questions by difficulty
db.questions.find({ "difficulty": "easy" });