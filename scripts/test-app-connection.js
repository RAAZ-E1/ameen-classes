import mongoose from 'mongoose';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

console.log(`🔗 Connecting to: ${MONGODB_URI}`);

// Simple Question schema for testing
const QuestionSchema = new mongoose.Schema({
  class: Number,
  subject: String,
  chapter: String,
  questionText: String,
  options: [String],
  correctAnswer: Number,
  explanation: String,
  difficulty: String,
  tags: [String]
});

const Question = mongoose.model('Question', QuestionSchema);

async function testConnection() {
  try {
    console.log('🚀 Testing application database connection...');
    
    // Connect using mongoose (like your app does)
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB via Mongoose');
    
    // Test query - get Class 11 Biology questions
    const questions = await Question.find({
      class: 11,
      subject: 'Biology'
    }).limit(3);
    
    console.log(`📊 Found ${questions.length} Class 11 Biology questions`);
    
    if (questions.length > 0) {
      console.log('\n📋 Sample questions:');
      questions.forEach((q, index) => {
        console.log(`   ${index + 1}. ${q.questionText.substring(0, 50)}...`);
        console.log(`      Correct Answer: ${q.options[q.correctAnswer]}`);
      });
    }
    
    console.log('\n✅ Application database connection test successful!');
    console.log('🎯 Your app should now be able to load questions from MongoDB');
    
  } catch (error) {
    console.error('💥 Connection test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
}

testConnection();