/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'neetjee_prep';
const collection = 'questions';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// Sample question document
const sampleQuestion = {
  "_id": "unique_id_here",
  "chapter": "The Living World",
  "class": 11,
  "subject": "Biology",
  "questionText": "The living organisms can be distinguished from non-living things on the basis of?",
  "options": [
    "interaction with the environment and progressive evolution",
    "reproduction",
    "growth and movement",
    "responsiveness to touch"
  ],
  "correctAnswer": 1
};

// Insert the sample question into the collection
db.questions.insertOne(sampleQuestion);

// Query to verify the insertion
db.questions.find();

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/