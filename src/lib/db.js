import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(process.env.MONGODB_URI, {
      // Connection timeouts
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 10000, // 10 seconds
      // Pool settings
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      // SSL/TLS options
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true
    });
    
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    
    // Don't exit process in development to allow fallback
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log("🔄 Development mode: Continuing with fallback data");
    }
  }
};

export default connectDB;
