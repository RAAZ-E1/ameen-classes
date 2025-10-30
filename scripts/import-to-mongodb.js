import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection URL - update this to match your setup
const MONGODB_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'ameen-classes';
const COLLECTION_NAME = 'questions';

async function importQuestions() {
  let client;
  
  try {
    console.log('🚀 Starting MongoDB import...');
    
    // Read the fixed data
    const dataPath = path.join(__dirname, '../data-fixed.json');
    const questionsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`📊 Found ${questionsData.length} questions to import`);
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URL);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    // Get database and collection
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Check if collection already has data
    const existingCount = await collection.countDocuments();
    console.log(`📋 Found ${existingCount} existing questions in database`);
    
    if (existingCount > 0) {
      console.log('⚠️  Warning: Collection already contains data. This will add more questions.');
      console.log('   To start fresh, you can drop the collection first.');
    }
    
    // Insert questions in batches
    const batchSize = 10;
    let totalInserted = 0;
    
    for (let i = 0; i < questionsData.length; i += batchSize) {
      const batch = questionsData.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      console.log(`📦 Inserting batch ${batchNumber}/${Math.ceil(questionsData.length / batchSize)}...`);
      
      const result = await collection.insertMany(batch);
      totalInserted += result.insertedCount;
      
      console.log(`✅ Batch ${batchNumber} inserted: ${result.insertedCount} questions`);
    }
    
    console.log(`🎉 Import completed successfully!`);
    console.log(`📊 Total questions imported: ${totalInserted}`);
    
    // Create indexes for better performance
    console.log('📈 Creating indexes...');
    await collection.createIndex({ class: 1, subject: 1 });
    await collection.createIndex({ subject: 1, chapter: 1 });
    await collection.createIndex({ difficulty: 1 });
    await collection.createIndex({ tags: 1 });
    console.log('✅ Indexes created');
    
    // Show some statistics
    const stats = await collection.aggregate([
      {
        $group: {
          _id: { class: "$class", subject: "$subject" },
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    console.log('\n📊 Import Statistics:');
    stats.forEach(stat => {
      console.log(`   Class ${stat._id.class} ${stat._id.subject}: ${stat.count} questions`);
    });
    
  } catch (error) {
    console.error('💥 Import failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('📤 Disconnected from MongoDB');
    }
  }
}

// Run the import
importQuestions();