import { MongoClient } from 'mongodb';

const MONGODB_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'ameen-classes';
const COLLECTION_NAME = 'questions';

async function verifyImport() {
  let client;
  
  try {
    console.log('🔍 Verifying MongoDB import...');
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URL);
    await client.connect();
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Get total count
    const totalCount = await collection.countDocuments();
    console.log(`📊 Total questions in database: ${totalCount}`);
    
    // Get sample question
    const sampleQuestion = await collection.findOne();
    console.log('\n📋 Sample question:');
    console.log(JSON.stringify(sampleQuestion, null, 2));
    
    // Get statistics by subject
    const subjectStats = await collection.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
          chapters: { $addToSet: "$chapter" }
        }
      }
    ]).toArray();
    
    console.log('\n📈 Statistics by Subject:');
    subjectStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} questions`);
      console.log(`   Chapters: ${stat.chapters.join(', ')}`);
    });
    
    // Test a query that your app will use
    const class11Biology = await collection.find({
      class: 11,
      subject: "Biology"
    }).limit(5).toArray();
    
    console.log(`\n🧪 Test Query - Class 11 Biology (first 5):`);
    class11Biology.forEach((q, index) => {
      console.log(`   ${index + 1}. ${q.questionText.substring(0, 60)}...`);
      console.log(`      Answer: ${q.options[q.correctAnswer]}`);
    });
    
    console.log('\n✅ Import verification completed successfully!');
    
  } catch (error) {
    console.error('💥 Verification failed:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

verifyImport();