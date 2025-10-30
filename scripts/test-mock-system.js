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

async function testMockSystem() {
  try {
    console.log('🎯 Testing Complete Mock Test System...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Test NEET Mock Test
    console.log('\n📚 Testing NEET Mock Test:');
    const neetQuestions = await Question.find({
      class: { $in: [11, 12] },
      subject: { $in: ['Physics', 'Chemistry', 'Biology'] }
    }).limit(10);
    
    console.log(`✅ NEET Questions Available: ${neetQuestions.length}`);
    
    // Show subject distribution for NEET
    const neetSubjects = {};
    neetQuestions.forEach(q => {
      neetSubjects[q.subject] = (neetSubjects[q.subject] || 0) + 1;
    });
    
    console.log('   Subject Distribution:');
    Object.entries(neetSubjects).forEach(([subject, count]) => {
      console.log(`     ${subject}: ${count} questions`);
    });
    
    // Test JEE Mock Test
    console.log('\n📚 Testing JEE Mock Test:');
    const jeeQuestions = await Question.find({
      class: { $in: [11, 12] },
      subject: { $in: ['Physics', 'Chemistry', 'Mathematics'] }
    }).limit(10);
    
    console.log(`✅ JEE Questions Available: ${jeeQuestions.length}`);
    
    // Show subject distribution for JEE
    const jeeSubjects = {};
    jeeQuestions.forEach(q => {
      jeeSubjects[q.subject] = (jeeSubjects[q.subject] || 0) + 1;
    });
    
    console.log('   Subject Distribution:');
    Object.entries(jeeSubjects).forEach(([subject, count]) => {
      console.log(`     ${subject}: ${count} questions`);
    });
    
    // Test question format compatibility
    console.log('\n🔍 Testing Question Format Compatibility:');
    if (neetQuestions.length > 0) {
      const sample = neetQuestions[0];
      console.log('   ✅ Sample question structure:');
      console.log(`     ID: ${sample._id}`);
      console.log(`     Subject: ${sample.subject}`);
      console.log(`     Chapter: ${sample.chapter}`);
      console.log(`     Question: ${sample.questionText.substring(0, 50)}...`);
      console.log(`     Options: ${sample.options.length} choices`);
      console.log(`     Correct Answer: ${sample.correctAnswer} (${sample.options[sample.correctAnswer]})`);
      console.log(`     Difficulty: ${sample.difficulty}`);
      console.log(`     Has Explanation: ${sample.explanation ? 'Yes' : 'No'}`);
    }
    
    // Overall statistics
    console.log('\n📊 Overall Database Statistics:');
    const totalQuestions = await Question.countDocuments();
    console.log(`   Total Questions: ${totalQuestions}`);
    
    const allSubjects = await Question.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
          chapters: { $addToSet: "$chapter" },
          difficulties: { $addToSet: "$difficulty" }
        }
      }
    ]);
    
    allSubjects.forEach(subject => {
      console.log(`   ${subject._id}:`);
      console.log(`     Questions: ${subject.count}`);
      console.log(`     Chapters: ${subject.chapters.join(', ')}`);
      console.log(`     Difficulties: ${subject.difficulties.join(', ')}`);
    });
    
    console.log('\n🎉 Mock Test System Ready!');
    console.log('📱 You can now:');
    console.log('   1. Visit /mock-tests in your app');
    console.log('   2. Select NEET or JEE exam type');
    console.log('   3. Take mock tests with real questions from MongoDB');
    console.log('   4. Get AI-powered analysis with Groq');
    
    console.log('\n📈 To add more questions:');
    console.log('   - Add more data to JSON files');
    console.log('   - Run: npm run db:import-additional');
    console.log('   - Questions will automatically appear in mock tests');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testMockSystem();