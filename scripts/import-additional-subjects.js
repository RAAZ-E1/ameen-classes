import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'ameen-classes';
const COLLECTION_NAME = 'questions';

async function importAdditionalSubjects() {
  let client;
  
  try {
    console.log('🚀 Importing additional subjects (Physics, Chemistry, Mathematics)...');
    
    // Read the additional subjects data
    const dataPath = path.join(__dirname, '../src/data/sample-physics-chemistry.json');
    const questionsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`📊 Found ${questionsData.length} additional questions to import`);
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URL);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    // Get database and collection
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Check existing count
    const existingCount = await collection.countDocuments();
    console.log(`📋 Current questions in database: ${existingCount}`);
    
    // Insert the new questions
    const result = await collection.insertMany(questionsData);
    console.log(`✅ Inserted ${result.insertedCount} additional questions`);
    
    // Show updated statistics
    const newTotal = await collection.countDocuments();
    console.log(`📊 Total questions now: ${newTotal}`);
    
    // Show subject breakdown
    const subjects = await collection.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
          chapters: { $addToSet: "$chapter" }
        }
      }
    ]).toArray();
    
    console.log('\n📈 Updated subject breakdown:');
    subjects.forEach(subject => {
      console.log(`   ${subject._id}: ${subject.count} questions`);
      console.log(`     Chapters: ${subject.chapters.join(', ')}`);
    });
    
    console.log('\n🎉 Additional subjects imported successfully!');
    console.log('📚 Now you have questions for:');
    console.log('   - NEET: Biology, Physics, Chemistry');
    console.log('   - JEE: Mathematics, Physics, Chemistry');
    
  } catch (error) {
    console.error('💥 Import failed:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('📤 Disconnected from MongoDB');
    }
  }
}

importAdditionalSubjects();