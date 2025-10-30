import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Test the database functions that your app uses
import connectDB from '../src/lib/db.js';
import Question from '../src/models/Question.js';

async function testIntegration() {
  try {
    console.log('🧪 Testing full application integration...');
    
    // Test 1: Basic connection
    await connectDB();
    console.log('✅ Database connection successful');
    
    // Test 2: Count total questions
    const totalCount = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${totalCount}`);
    
    // Test 3: Test NEET exam query (like your mock test will use)
    const neetQuestions = await Question.find({
      class: { $in: [11, 12] },
      subject: { $in: ['Physics', 'Chemistry', 'Biology'] }
    }).limit(5).lean();
    
    console.log(`🎯 Found ${neetQuestions.length} NEET-style questions`);
    
    // Test 4: Test the exact format your app expects
    const formattedQuestions = neetQuestions.map(q => ({
      id: q._id.toString(),
      question: q.questionText,
      options: q.options,
      correct_answer: q.correctAnswer,
      subject: q.subject,
      topic: q.chapter,
      difficulty: q.difficulty,
      exam_type: 'NEET'
    }));
    
    console.log('\n📋 Sample formatted question for your app:');
    console.log(JSON.stringify(formattedQuestions[0], null, 2));
    
    // Test 5: Verify question quality
    const sampleQ = formattedQuestions[0];
    const validationResults = {
      hasQuestion: !!sampleQ.question,
      hasOptions: sampleQ.options && sampleQ.options.length === 4,
      hasValidAnswer: typeof sampleQ.correct_answer === 'number' && sampleQ.correct_answer >= 0 && sampleQ.correct_answer <= 3,
      hasSubject: !!sampleQ.subject,
      hasTopic: !!sampleQ.topic
    };
    
    console.log('\n🔍 Question validation:');
    Object.entries(validationResults).forEach(([key, value]) => {
      console.log(`   ${value ? '✅' : '❌'} ${key}: ${value}`);
    });
    
    const allValid = Object.values(validationResults).every(v => v);
    
    if (allValid) {
      console.log('\n🎉 All tests passed! Your application should work perfectly with the imported questions.');
      console.log('\n🚀 Next steps:');
      console.log('   1. Start your Next.js app: npm run dev');
      console.log('   2. Visit: http://localhost:3000/test-questions');
      console.log('   3. Visit: http://localhost:3000/mock-tests');
    } else {
      console.log('\n⚠️ Some validation checks failed. Please review the data format.');
    }
    
  } catch (error) {
    console.error('💥 Integration test failed:', error);
  } finally {
    process.exit(0);
  }
}

testIntegration();