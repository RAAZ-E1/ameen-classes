import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Database already connected");
      return mongoose.connection;
    }

    console.log("🔗 Connecting to new database...");

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Connection options with SSL workaround for Windows
    const options = {
      // Basic timeouts
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 15000, // 15 seconds

      // Connection pool
      maxPoolSize: 10,
      minPoolSize: 1,

      // Enable buffering for better reliability
      bufferMaxEntries: 10,
      bufferCommands: true,

      // SSL/TLS configuration for Windows compatibility
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    };

    console.log("🔗 Attempting connection to MongoDB Atlas...");
    
    // Single connection attempt with proper options
    const connection = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log("✅ Database connected successfully!");
    console.log(`📊 Connected to database: ${connection.connection.db.databaseName}`);
    console.log(`🌐 Host: ${connection.connection.host}`);

    // Set up connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ Database connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Database disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Database reconnected');
    });

    return connection;

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // Specific error guidance
    if (error.message.includes('authentication failed')) {
      console.log("🔍 Authentication failed - check your username/password");
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log("🔍 Connection failed - check your connection string and network access");
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log("🔍 SSL/TLS error - your connection string should handle this automatically");
    }

    // In development, continue with fallback
    if (process.env.NODE_ENV !== 'production') {
      console.log("🔄 Development mode: Continuing with fallback data");
      return null;
    } else {
      throw error;
    }
  }
};

export default connectDB;