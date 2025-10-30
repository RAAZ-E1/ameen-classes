// We'll test the database directly using mongoose
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

// Question schema
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

async function testQuestionsAPI() {
  try {
    console.log('🧪 Testing questions for mock tests...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Test NEET questions (should include Biology)
    console.log('\n📚 Testing NEET questions:');
    const neetQuestions = await Question.find({
      class: { $in: [11, 12] },
      subject: { $in: ['Physics', 'Chemistry', 'Biology'] }
    }).limit(5);
    
    if (neetQuestions && neetQuestions.length > 0) {
      console.log(`✅ Found ${neetQuestions.length} NEET questions`);
      console.log('📋 Sample NEET question:');
      const sample = neetQuestions[0];
      console.log(`   Subject: ${sample.subject}`);
      console.log(`   Chapter: ${sample.chapter}`);
      console.log(`   Question: ${sample.questionText.substring(0, 60)}...`);
      console.log(`   Options: ${sample.options.length} options`);
      console.log(`   Correct Answer: ${sample.correctAnswer} (${sample.options[sample.correctAnswer]})`);
      console.log(`   Explanation: ${sample.explanation?.substring(0, 80)}...`);
    } else {
      console.log('❌ No NEET questions found');
    }
    
    // Test JEE questions (should include Math, Physics, Chemistry)
    console.log('\n📚 Testing JEE questions:');
    const jeeQuestions = await Question.find({
      class: { $in: [11, 12] },
      subject: { $in: ['Physics', 'Chemistry', 'Mathematics'] }
    }).limit(5);
    
    if (jeeQuestions && jeeQuestions.length > 0) {
      console.log(`✅ Found ${jeeQuestions.length} JEE questions`);
    } else {
      console.log('⚠️  No JEE questions found (expected - we only have Biology currently)');
    }
    
    // Show subject breakdown
    console.log('\n📊 Subject breakdown:');
    const subjects = await Question.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
          chapters: { $addToSet: "$chapter" }
        }
      }
    ]);
    
    subjects.forEach(subject => {
      console.log(`   ${subject._id}: ${subject.count} questions (${subject.chapters.join(', ')})`);
    });
    
    console.log('\n✅ Questions test completed!');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testQuestionsAPI();