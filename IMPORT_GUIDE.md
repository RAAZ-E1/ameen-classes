# Biology Questions Import Guide

This guide explains how to import biology questions into your MongoDB database for the AI-powered mock test system.

## 📋 Prerequisites

1. **MongoDB Database Setup**: You can use either:
   - **Local MongoDB**: Install MongoDB locally
   - **MongoDB Atlas**: Use the cloud service (recommended)

### Database Collections
The system will automatically create these collections:
- `questions` - Stores all quiz questions
- `testresults` - Stores test results and analytics

2. **Environment Variables**: Set up your `.env.local` file:
```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/ameen-classes

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ameen-classes

# AI Configuration
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

## 🚀 Import Methods

### Method 1: Admin Interface (Recommended)
1. Navigate to `/admin` in your browser
2. Review the data preview showing 39 biology questions
3. Check existing questions in database
4. Click "Import Questions to Supabase"
5. Monitor the import progress

### Method 2: Node.js Script
```bash
node scripts/import-questions.js
```

### Method 3: Programmatic Import
```typescript
import { importBiologyQuestions } from '@/lib/import-biology-questions';

const result = await importBiologyQuestions();
console.log(result);
```

## 📊 Data Overview

- **Total Questions**: 39
- **Subject**: Biology
- **Topic**: The Living World
- **Exam Type**: NEET
- **Difficulty**: Mixed (Easy, Medium, Hard)

## 🔧 Features

### Import System
- ✅ Batch processing (10 questions per batch)
- ✅ Error handling and rollback
- ✅ Progress tracking
- ✅ Duplicate detection
- ✅ Validation checks

### Mock Test Integration
- ✅ Real-time question fetching from database
- ✅ AI-powered performance analysis with Groq
- ✅ Subject-wise scoring
- ✅ Detailed feedback and recommendations
- ✅ Math formula rendering with KaTeX

## 🧪 Testing

### Test the Import
Visit `/test-import` to run a comprehensive test of:
- Database connection
- Question import functionality
- Question fetching for mock tests
- Error handling

### Test the Mock Test
1. Go to `/mock-tests`
2. Select NEET exam type
3. Start the test with imported questions
4. Complete the test to see AI analysis

## ⚠️ Important Notes

1. **Correct Answers**: The imported questions have correct answers set based on common knowledge. **Please verify and update them** in your Supabase dashboard.

2. **Duplicates**: The system warns about existing questions but doesn't prevent duplicates. Clear existing data if you want a fresh import.

3. **Rate Limiting**: The import uses batching and delays to avoid overwhelming the database.

4. **Connection**: Ensure your MongoDB connection string is correct and the database is accessible.

## 🔍 Verification Steps

After import:
1. Check your MongoDB database (using MongoDB Compass or Atlas dashboard)
2. Verify question count matches expected (39 questions)
3. Review a few questions for accuracy
4. Test the mock test functionality
5. Verify AI analysis works correctly

## 🛠️ Troubleshooting

### Common Issues

**Import fails with connection error**
- Check your MongoDB URI in `.env.local`
- Ensure MongoDB is running (for local) or accessible (for Atlas)
- Verify network connectivity and firewall settings

**Questions not appearing in mock test**
- Verify the `exam_type` field matches exactly ('NEET')
- Check the `getQuestionsByExam` function

**AI analysis not working**
- Ensure Groq API key is configured
- Check the `groq-analysis.ts` implementation

**Math formulas not rendering**
- Verify KaTeX is properly installed
- Check the `smartTextToLatex` function

## 📈 Next Steps

1. **Import the questions** using your preferred method
2. **Verify the data** in Supabase dashboard
3. **Update correct answers** as needed
4. **Test the complete flow** from question selection to AI analysis
5. **Add more question sets** for different topics/subjects
6. **Customize the AI analysis** prompts for better insights

## 🎯 Success Metrics

After successful import, you should have:
- ✅ 39 biology questions in your database
- ✅ Working mock test with real questions
- ✅ AI-powered performance analysis
- ✅ Subject-wise breakdown and recommendations
- ✅ Detailed feedback for students

---

**Need Help?** Check the console logs during import for detailed error messages and progress updates.