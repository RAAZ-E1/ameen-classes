import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the original data
const dataPath = path.join(__dirname, '../data.json');
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Processing ${rawData.length} questions...`);

// Fix the data format
const fixedData = rawData.map((question, index) => {
  // Clean up options - remove a), b), c), d) prefixes
  const cleanOptions = question.options.map(option => {
    return option.replace(/^[a-d]\)\s*/, '').trim();
  });

  // Find the correct answer index
  let correctAnswerIndex = 0;
  const correctAnswerText = question.correctAnswer.replace(/^[a-d]\)\s*/, '').trim();
  
  // Find which option matches the correct answer
  for (let i = 0; i < cleanOptions.length; i++) {
    if (cleanOptions[i] === correctAnswerText) {
      correctAnswerIndex = i;
      break;
    }
  }

  // Create the fixed question object
  return {
    class: question.class,
    subject: question.subject,
    chapter: question.chapter,
    questionText: question.questionText,
    options: cleanOptions,
    correctAnswer: correctAnswerIndex,
    explanation: question.explanation,
    difficulty: "medium", // Default difficulty
    tags: ["biology", "living-world", "taxonomy"] // Default tags
  };
});

// Write the fixed data
const outputPath = path.join(__dirname, '../data-fixed.json');
fs.writeFileSync(outputPath, JSON.stringify(fixedData, null, 2));

console.log(`✅ Fixed data written to: ${outputPath}`);
console.log(`📊 Processed ${fixedData.length} questions`);

// Show a sample of the fixed data
console.log('\n📋 Sample fixed question:');
console.log(JSON.stringify(fixedData[0], null, 2));