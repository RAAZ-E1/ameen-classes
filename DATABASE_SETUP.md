# 🗄️ MongoDB Atlas Database Setup Guide

## Step 1: Create New MongoDB Atlas Account/Project

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Sign up or log in** to your account
3. **Create a new project** called "Ameen Classes"

## Step 2: Create a New Cluster

1. **Click "Build a Database"**
2. **Choose "M0 Sandbox"** (Free tier)
3. **Select a cloud provider and region** (choose closest to your location)
4. **Name your cluster**: `ameen-classes-cluster`
5. **Click "Create Cluster"**

## Step 3: Create Database User

1. **Go to "Database Access"** in the left sidebar
2. **Click "Add New Database User"**
3. **Choose "Password" authentication**
4. **Username**: `admin`
5. **Password**: Generate a secure password (save it!)
6. **Database User Privileges**: Select "Read and write to any database"
7. **Click "Add User"**

## Step 4: Configure Network Access

1. **Go to "Network Access"** in the left sidebar
2. **Click "Add IP Address"**
3. **Click "Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` to your IP whitelist
   - ⚠️ **Important**: Restrict this in production!
4. **Click "Confirm"**

## Step 5: Get Connection String

1. **Go to "Database"** in the left sidebar
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Select "Node.js" and version "4.1 or later"**
5. **Copy the connection string** - it should look like:
   ```
   mongodb+srv://admin:<password>@ameen-classes-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env.local File

Replace the MONGODB_URI in your `.env.local` file:

```env
# Replace this with your actual connection string
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@ameen-classes-cluster.xxxxx.mongodb.net/ameen-classes-new?retryWrites=true&w=majority
```

**Important**: 
- Replace `YOUR_PASSWORD` with the actual password you created
- Replace `xxxxx` with your actual cluster identifier
- Keep `/ameen-classes-new` as the database name

## Step 7: Test the Connection

1. **Save your .env.local file**
2. **Restart your Next.js development server**:
   ```bash
   npm run dev
   ```
3. **Test the connection**:
   ```bash
   curl http://localhost:3000/api/test-connection
   ```

You should see a success response with connection details.

## Step 8: Test Admin Panel

1. **Go to**: http://localhost:3000/admin
2. **Login with password**: `admin123secure`
3. **Try adding a test question** using the form
4. **Check if the question is saved** by refreshing the page

## Troubleshooting

### Connection Issues
- ✅ **Check your IP whitelist** in MongoDB Atlas Network Access
- ✅ **Verify your username/password** are correct
- ✅ **Ensure your cluster is not paused**
- ✅ **Check your internet connection**

### Authentication Issues
- ✅ **Double-check the password** in your connection string
- ✅ **Ensure the database user has proper permissions**
- ✅ **Try creating a new database user**

### SSL/TLS Issues
- ✅ **Use the exact connection string** from MongoDB Atlas
- ✅ **Don't modify SSL parameters** unless necessary
- ✅ **Update Node.js** to the latest LTS version

## Success Indicators

✅ **Connection successful** when you see:
```
✅ Database connected successfully!
📊 Connected to database: ameen-classes-new
🌐 Host: ameen-classes-cluster-xxxxx.mongodb.net
```

✅ **Admin panel working** when you can:
- Login to /admin
- Add questions through the form
- See questions saved in the database

## Next Steps

Once your database is connected:
1. **Add sample questions** through the admin panel
2. **Test the mock test functionality**
3. **Restrict IP access** in production
4. **Set up database backups** (optional)

---

**Need help?** Check the console logs for detailed error messages and troubleshooting hints.