import { insertQuestions, getQuestionCount } from './database';
import questionsData from '../data/biology-questions.json';

export async function importBiologyQuestions() {
  try {
    console.log(`Starting import of ${questionsData.length} biology questions...`);

    // Insert questions in batches to avoid timeout
    const batchSize = 10;
    let totalInserted = 0;

    for (let i = 0; i < questionsData.length; i += batchSize) {
      const batch = questionsData.slice(i, i + batchSize);

      console.log(`Importing batch ${Math.floor(i / batchSize) + 1}...`);

      // Transform old format to new format
      const transformedBatch = batch.map(q => ({
        class: 11,
        subject: q.subject,
        chapter: q.topic,
        questionText: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: '',
        difficulty: q.difficulty,
        tags: ['biology', 'neet']
      }));

      const result = await insertQuestions(transformedBatch);

      totalInserted += result.length;
      console.log(`✓ Batch ${Math.floor(i / batchSize) + 1} imported: ${result.length} questions`);
    }

    console.log(`🎉 Import completed! Total questions imported: ${totalInserted}`);
    return { success: true, count: totalInserted };

  } catch (error) {
    console.error('Import failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Function to check if questions already exist
export async function checkExistingQuestions() {
  try {
    const count = await getQuestionCount(11, 'Biology', 'The Living World');
    return { count, questions: [] };
  } catch (error) {
    console.error('Error checking existing questions:', error);
    return { count: 0, questions: [] };
  }
}