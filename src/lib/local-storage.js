import fs from 'fs';
import path from 'path';

const QUESTIONS_FILE = path.join(process.cwd(), 'local-questions.json');

// Initialize the file if it doesn't exist
function initializeQuestionsFile() {
  if (!fs.existsSync(QUESTIONS_FILE)) {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify([], null, 2));
    console.log('📁 Created local questions file');
  }
}

// Read questions from local file
export function readLocalQuestions() {
  try {
    initializeQuestionsFile();
    const data = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading local questions:', error);
    return [];
  }
}

// Write questions to local file
export function writeLocalQuestions(questions) {
  try {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2));
    console.log(`✅ Saved ${questions.length} questions to local file`);
    return true;
  } catch (error) {
    console.error('❌ Error writing local questions:', error);
    return false;
  }
}

// Add questions to local file
export function addLocalQuestions(newQuestions) {
  try {
    const existingQuestions = readLocalQuestions();
    const questionsWithIds = newQuestions.map((q, index) => ({
      ...q,
      _id: `local_${Date.now()}_${index}`,
      createdAt: new Date().toISOString(),
      source: 'local'
    }));
    
    const allQuestions = [...existingQuestions, ...questionsWithIds];
    writeLocalQuestions(allQuestions);
    
    console.log(`✅ Added ${newQuestions.length} questions to local storage`);
    return questionsWithIds;
  } catch (error) {
    console.error('❌ Error adding local questions:', error);
    return null;
  }
}

// Get question statistics from local file
export function getLocalQuestionStats() {
  try {
    const questions = readLocalQuestions();
    const totalQuestions = questions.length;
    
    const subjectStats = questions.reduce((acc, q) => {
      const existing = acc.find(s => s._id === q.subject);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ _id: q.subject, count: 1 });
      }
      return acc;
    }, []);
    
    return {
      totalQuestions,
      subjectStats,
      source: 'local'
    };
  } catch (error) {
    console.error('❌ Error getting local stats:', error);
    return {
      totalQuestions: 0,
      subjectStats: [],
      source: 'local'
    };
  }
}

// Query questions from local file
export function queryLocalQuestions(query = {}, limit = 10) {
  try {
    let questions = readLocalQuestions();
    
    // Filter by class
    if (query.class) {
      if (Array.isArray(query.class.$in)) {
        questions = questions.filter(q => query.class.$in.includes(q.class));
      } else {
        questions = questions.filter(q => q.class === query.class);
      }
    }
    
    // Filter by subject
    if (query.subject) {
      if (Array.isArray(query.subject.$in)) {
        questions = questions.filter(q => query.subject.$in.includes(q.subject));
      } else {
        questions = questions.filter(q => q.subject === query.subject);
      }
    }
    
    // Limit results
    questions = questions.slice(0, limit);
    
    console.log(`📊 Found ${questions.length} local questions matching query`);
    return questions;
  } catch (error) {
    console.error('❌ Error querying local questions:', error);
    return [];
  }
}