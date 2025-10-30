// Simple test to check if the API is working
const testAPI = async () => {
  try {
    console.log('Testing MongoDB Atlas connection...');
    
    // Test the database connection
    const testResponse = await fetch('http://localhost:3000/api/test-db');
    const testResult = await testResponse.json();
    console.log('Database test result:', testResult);
    
    // Test the questions API
    const questionsResponse = await fetch('http://localhost:3000/api/questions?examType=NEET&limit=5');
    const questionsResult = await questionsResponse.json();
    console.log('Questions API result:', questionsResult);
    
    if (questionsResult.success && questionsResult.questions.length > 0) {
      console.log('✅ API is working! Found', questionsResult.questions.length, 'questions');
      console.log('First question:', questionsResult.questions[0].questionText.substring(0, 100) + '...');
    } else {
      console.log('❌ API failed or no questions found');
    }
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Run the test
testAPI();