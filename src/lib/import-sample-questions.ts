import { insertQuestions, getQuestionCount } from './database';
import questionsData from '../data/sample-questions.json';

export async function importSampleQuestions() {
  try {
    console.log(`Starting import of ${questionsData.length} sample questions...`);

    // Transform data to match the expected structure
    const transformedQuestions = questionsData.map(q => ({
      class: q.class,
      subject: q.subject,
      chapter: q.chapter,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
      tags: q.tags
    }));

    // Insert all questions at once
    const result = await insertQuestions(transformedQuestions);

    console.log(`🎉 Import completed! Total questions imported: ${result.length}`);
    return { success: true, count: result.length };

  } catch (error) {
    console.error('Import failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Function to check if questions already exist
export async function checkExistingQuestions(classNumber: number = 11, subject?: string) {
  try {
    const count = await getQuestionCount(classNumber, subject);
    return { count, questions: [] };
  } catch (error) {
    console.error('Error checking existing questions:', error);
    return { count: 0, questions: [] };
  }
}

// Function to get questions by class and subject
export async function getQuestionsByClassAndSubject(classNumber: number, subject: string, limit: number = 20) {
  try {
    const { getQuestionsBySubject } = await import('./database');
    const questions = await getQuestionsBySubject(classNumber, subject, limit);
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return null;
  }
}