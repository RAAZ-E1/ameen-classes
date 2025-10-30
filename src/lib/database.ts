
import connectDB from './db.js';
import Question from '../models/Question.js';
import TestResult from '../models/TestResult.js';

type MongoDocument = {
  _id: unknown;
  [key: string]: unknown;
};

export async function getQuestions() {
  try {
    await connectDB();
    const questions = await Question.find({}, 'questionText options')
      .sort({ _id: 1 })
      .lean();

    return questions.map((q: MongoDocument) => ({
      id: (q._id as { toString(): string }).toString(),
      question: q.questionText as string,
      options: q.options as string[]
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return null;
  }
}

export async function getQuestionsByClass(classNumber: number, limit: number = 50) {
  try {
    await connectDB();
    const questions = await Question.find({ class: classNumber })
      .limit(limit)
      .sort({ _id: 1 })
      .lean();

    return questions.map((q: MongoDocument) => ({
      id: (q._id as { toString(): string }).toString(),
      question: q.questionText as string,
      options: q.options as string[],
      correctAnswer: q.correctAnswer as number,
      subject: q.subject as string,
      chapter: q.chapter as string,
      difficulty: q.difficulty as string,
      explanation: q.explanation as string | undefined,
      tags: q.tags as string[] | undefined
    }));
  } catch (error) {
    console.error('Error fetching questions by class:', error);
    return null;
  }
}

export async function getQuestionsByExam(examType: 'NEET' | 'JEE', limit: number = 50) {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected');

    // Map exam types to class numbers (NEET = class 11-12, JEE = class 11-12)
    const classNumbers = examType === 'NEET' ? [11, 12] : [11, 12];
    const subjects = examType === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Mathematics'];

    console.log('🔍 Query parameters:', {
      examType,
      classNumbers,
      subjects,
      limit
    });

    const query = {
      class: { $in: classNumbers },
      subject: { $in: subjects }
    };

    console.log('📝 MongoDB query:', JSON.stringify(query, null, 2));

    const questions = await Question.find(query)
      .limit(limit)
      .sort({ _id: 1 })
      .lean();

    console.log('📊 Raw database result:', {
      count: questions.length,
      firstQuestion: questions[0] ? {
        id: questions[0]._id,
        subject: questions[0].subject,
        class: questions[0].class
      } : 'No questions'
    });

    const mappedQuestions = questions.map((q: MongoDocument) => ({
      id: (q._id as { toString(): string }).toString(),
      questionText: q.questionText as string,
      question: q.questionText as string, // Legacy compatibility
      options: q.options as string[],
      correctAnswer: q.correctAnswer as number,
      correct_answer: q.correctAnswer as number, // Legacy compatibility
      subject: q.subject as string,
      chapter: q.chapter as string,
      topic: q.chapter as string, // Legacy compatibility
      difficulty: q.difficulty as string,
      exam_type: examType,
      explanation: q.explanation as string | undefined,
      tags: q.tags as string[] | undefined,
      class: q.class as number
    }));

    console.log('✅ Mapped questions:', mappedQuestions.length);
    return mappedQuestions;
  } catch (error) {
    console.error('💥 Error fetching questions by exam:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return null;
  }
}

export async function getQuestionsBySubject(classNumber: number, subject: string, limit: number = 20) {
  try {
    await connectDB();
    const questions = await Question.find({
      class: classNumber,
      subject: subject
    })
      .limit(limit)
      .sort({ _id: 1 })
      .lean();

    return questions.map((q: MongoDocument) => ({
      id: (q._id as { toString(): string }).toString(),
      question: q.questionText as string,
      options: q.options as string[],
      correctAnswer: q.correctAnswer as number,
      subject: q.subject as string,
      chapter: q.chapter as string,
      difficulty: q.difficulty as string,
      explanation: q.explanation as string | undefined,
      tags: q.tags as string[] | undefined
    }));
  } catch (error) {
    console.error('Error fetching questions by subject:', error);
    return null;
  }
}

export async function saveTestResult(testData: {
  exam_type: string;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  subject_scores: Record<string, { correct: number; total: number }>;
  answers: Array<{ question_id: string; selected_answer: number; is_correct: boolean }>;
}) {
  try {
    await connectDB();
    const testResult = new TestResult(testData);
    const savedResult = await testResult.save();

    return [{
      id: savedResult._id.toString(),
      ...testData
    }];
  } catch (error) {
    console.error('Error saving test result:', error);
    return null;
  }
}

// Additional MongoDB-specific functions
export async function insertQuestions(questions: Array<{
  class: number;
  subject: string;
  chapter: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: string;
  tags?: string[];
}>) {
  try {
    await connectDB();
    const result = await Question.insertMany(questions);
    return result;
  } catch (error) {
    console.error('Error inserting questions:', error);
    throw error;
  }
}

export async function getQuestionCount(classNumber?: number, subject?: string, chapter?: string) {
  try {
    await connectDB();
    const filter: Record<string, unknown> = {};
    if (classNumber) filter.class = classNumber;
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = chapter;

    const count = await Question.countDocuments(filter);
    return count;
  } catch (error) {
    console.error('Error getting question count:', error);
    return 0;
  }
}

export async function deleteAllQuestions(classNumber?: number) {
  try {
    await connectDB();
    const filter = classNumber ? { class: classNumber } : {};
    const result = await Question.deleteMany(filter);
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting questions:', error);
    throw error;
  }
}
