const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error('❌ Missing MongoDB URI in environment variables');
  console.error('Required: MONGODB_URI');
  process.exit(1);
}

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: Number, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  exam_type: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

async function importQuestions() {
  try {
    console.log('🚀 Starting biology questions import...');
    
    // Connect to MongoDB
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB');
    
    // Load questions data
    const questionsPath = path.join(__dirname, '../src/data/biology-questions.json');
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    
    console.log(`📊 Found ${questionsData.length} questions to import`);
    
    // Check if questions already exist
    const existingCount = await Question.countDocuments({
      topic: 'The Living World',
      exam_type: 'NEET'
    });
    
    console.log(`📋 Found ${existingCount} existing questions in database`);
    
    if (existingCount > 0) {
      console.log('⚠️  Warning: Questions already exist. This may create duplicates.');
      console.log('   Consider clearing existing questions first if you want a fresh import.');
    }
    
    // Import in batches
    const batchSize = 10;
    let totalInserted = 0;
    
    for (let i = 0; i < questionsData.length; i += batchSize) {
      const batch = questionsData.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      console.log(`📦 Importing batch ${batchNumber}/${Math.ceil(questionsData.length / batchSize)}...`);
      
      const result = await Question.insertMany(batch);
      
      totalInserted += result.length;
      console.log(`✅ Batch ${batchNumber} imported: ${result.length} questions`);
      
      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`🎉 Import completed successfully!`);
    console.log(`📊 Total questions imported: ${totalInserted}`);
    console.log(`🔗 Check your MongoDB database to verify the data`);
    
  } catch (error) {
    console.error('💥 Import failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
}

// Run the import
importQuestions();