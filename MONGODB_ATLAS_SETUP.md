# 🗄️ MongoDB Atlas Setup & Troubleshooting Guide

## 🚨 **Current Issue: SSL/TLS Connection Error**

You're experiencing this error:
```
Connection pool was cleared because another operation failed with: 
"SSL routines:OPENSSL_internal:TLSV1_ALERT_INTERNAL_ERROR"
```

This is a common MongoDB Atlas connectivity issue. Here's how to fix it:

## 🔧 **Step-by-Step Solution**

### 1. **Update MongoDB Connection String**

Replace your current connection string in `.env.local` with this format:
```env
MONGODB_URI=mongodb+srv://rayz:pw2PKFYskp407drp@neetjee.hiwakww.mongodb.net/ameen-classes?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true
```

### 2. **Update Database Connection File**

Update `src/lib/db.js`:
```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(process.env.MONGODB_URI, {
      // Remove deprecated options
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      // SSL/TLS options
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsInsecure: false
    });
    
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    
    // Don't exit process in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
```

### 3. **MongoDB Atlas Network Access**

1. **Go to MongoDB Atlas Dashboard**
2. **Click "Network Access" in left sidebar**
3. **Click "Add IP Address"**
4. **Choose one of these options:**
   - **Current IP**: Click "Add Current IP Address"
   - **Allow All**: Enter `0.0.0.0/0` (for development only)
   - **Specific IP**: Enter your current IP address

### 4. **Database User Permissions**

1. **Go to "Database Access" in MongoDB Atlas**
2. **Verify user `rayz` exists**
3. **Ensure user has "Read and write to any database" permissions**
4. **If needed, create a new user:**
   - Username: `admin`
   - Password: `securePassword123`
   - Role: `Atlas admin`

### 5. **Alternative Connection String**

If SSL issues persist, try this connection string:
```env
MONGODB_URI=mongodb+srv://rayz:pw2PKFYskp407drp@neetjee.hiwakww.mongodb.net/ameen-classes?retryWrites=true&w=majority&appName=ameen-classes
```

## 🔍 **Testing Your Connection**

### Test 1: Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "database": {
    "connected": true,
    "state": "connected"
  }
}
```

### Test 2: Questions API
```bash
curl "http://localhost:3000/api/questions?examType=NEET&limit=5"
```

## 🛠️ **Fallback System**

Your app now includes a fallback system:
- ✅ **Sample Questions**: When database is unavailable, app uses built-in sample questions
- ✅ **Graceful Degradation**: Mock tests work even without database connection
- ✅ **Clear Error Messages**: Users see helpful error messages

## 🚨 **Common Issues & Solutions**

### Issue 1: "IP not whitelisted"
**Solution**: Add your IP to MongoDB Atlas Network Access

### Issue 2: "Authentication failed"
**Solution**: Check username/password in connection string

### Issue 3: "SSL handshake failed"
**Solution**: Use the updated connection string with SSL options

### Issue 4: "Connection timeout"
**Solution**: Check your internet connection and MongoDB Atlas status

## 🎯 **Quick Fix Commands**

Run these commands to apply the fixes:

```bash
# 1. Update the database connection file
# (Copy the updated db.js content above)

# 2. Restart your development server
npm run dev

# 3. Test the connection
curl http://localhost:3000/api/health
```

## 📊 **Verification Steps**

1. ✅ **Server starts without errors**
2. ✅ **Health check returns "healthy"**
3. ✅ **Questions API returns data (real or sample)**
4. ✅ **Mock tests load and work**
5. ✅ **Admin panel shows question counts**

## 🎉 **Success Indicators**

When everything is working:
- Server console shows: `✅ MongoDB Connected Successfully`
- Health API returns: `"status": "healthy"`
- Questions API returns: `"success": true`
- Mock tests load questions
- Admin dashboard shows statistics

## 🔄 **If Issues Persist**

1. **Check MongoDB Atlas Status**: https://status.mongodb.com/
2. **Try Different Network**: Switch to mobile hotspot
3. **Contact MongoDB Support**: If it's a service issue
4. **Use Fallback Mode**: App works with sample questions

Your app is now resilient and will work even if MongoDB Atlas is temporarily unavailable!