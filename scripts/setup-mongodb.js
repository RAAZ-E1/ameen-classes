const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error('❌ Missing MongoDB URI in environment variables');
  console.error('Please add MONGODB_URI to your .env.local file');
  console.error('Example: MONGODB_URI=mongodb://localhost:27017/ameen-classes');
  process.exit(1);
}

async function setupDatabase() {
  try {
    console.log('🚀 Setting up MongoDB database...');
    
    // Connect to MongoDB
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB successfully');
    
    // Test the connection by getting database info
    const db = mongoose.connection.db;
    const admin = db.admin();
    const info = await admin.serverStatus();
    
    console.log(`📊 MongoDB Version: ${info.version}`);
    console.log(`🏠 Database: ${db.databaseName}`);
    console.log(`🔗 Host: ${info.host}`);
    
    // Create indexes for better performance
    const Question = mongoose.model('Question', new mongoose.Schema({
      question: String,
      options: [String],
      correct_answer: Number,
      subject: String,
      topic: String,
      difficulty: String,
      exam_type: String,
      created_at: { type: Date, default: Date.now }
    }));
    
    // Create indexes
    await Question.collection.createIndex({ exam_type: 1, subject: 1 });
    await Question.collection.createIndex({ exam_type: 1, topic: 1 });
    await Question.collection.createIndex({ difficulty: 1 });
    
    console.log('📈 Created database indexes for optimal performance');
    
    // Check existing collections
    const collections = await db.listCollections().toArray();
    console.log(`📁 Existing collections: ${collections.map(c => c.name).join(', ') || 'None'}`);
    
    console.log('🎉 MongoDB setup completed successfully!');
    console.log('💡 You can now run the import script to add questions');
    
  } catch (error) {
    console.error('💥 Setup failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('🔧 Troubleshooting:');
      console.error('   - Make sure MongoDB is running locally, or');
      console.error('   - Use MongoDB Atlas cloud service, or');
      console.error('   - Check your MONGODB_URI connection string');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
}

setupDatabase();