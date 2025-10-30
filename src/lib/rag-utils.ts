// Simple Question interface for MongoDB
export interface Question {
  id: string | number;
  class?: number;
  subject: string;
  chapter?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
  // Legacy fields for backward compatibility
  correct_answer?: number;
  exam_type?: 'NEET' | 'JEE';
  topic?: string;
}

// Test result interfaces
export interface StudentAnswer {
  question_id: string;
  selected_answer: number;
  is_correct: boolean;
  question_data: Question;
}

export interface TestAnalysis {
  overall_performance: {
    score_percentage: number;
    grade: string;
    strengths: string[];
    weaknesses: string[];
  };
  subject_analysis: Record<string, {
    score: number;
    total: number;
    percentage: number;
    weak_topics: string[];
    recommendations: string[];
  }>;
  detailed_feedback: string;
  study_plan: {
    priority_subjects: string[];
    recommended_topics: string[];
    study_hours_per_week: number;
    focus_areas: string[];
  };
}

// Simple validation function for questions
export function validateQuestion(question: Question): boolean {
  return !!(
    question.question &&
    question.options &&
    question.options.length === 4 &&
    typeof question.correct_answer === 'number' &&
    question.correct_answer >= 0 &&
    question.correct_answer <= 3 &&
    question.subject &&
    question.difficulty &&
    question.exam_type
  );
}

// Simple deduplication function
export function deduplicateQuestions(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const unique: Question[] = [];

  for (const question of questions) {
    const normalizedQuestion = question.question.toLowerCase().trim().replace(/\s+/g, ' ');
    
    if (!seen.has(normalizedQuestion)) {
      seen.add(normalizedQuestion);
      unique.push(question);
    }
  }

  return unique;
}

// Grade calculation helper
export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}

// Subject-wise analysis helper
export function analyzeSubjectPerformance(answers: StudentAnswer[]): Record<string, {
  score: number;
  total: number;
  percentage: number;
  weak_topics: string[];
  recommendations: string[];
}> {
  const subjectMap = new Map<string, {
    correct: number;
    total: number;
    topics: Map<string, { correct: number; total: number }>;
  }>();

  // Group answers by subject
  answers.forEach(answer => {
    const subject = answer.question_data.subject;
    const topic = answer.question_data.topic || 'General';
    
    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, {
        correct: 0,
        total: 0,
        topics: new Map()
      });
    }
    
    const subjectData = subjectMap.get(subject)!;
    subjectData.total++;
    
    if (answer.is_correct) {
      subjectData.correct++;
    }
    
    // Track topic performance
    if (!subjectData.topics.has(topic)) {
      subjectData.topics.set(topic, { correct: 0, total: 0 });
    }
    
    const topicData = subjectData.topics.get(topic)!;
    topicData.total++;
    if (answer.is_correct) {
      topicData.correct++;
    }
  });

  // Convert to result format
  const result: Record<string, {
    score: number;
    total: number;
    percentage: number;
    weak_topics: string[];
    recommendations: string[];
  }> = {};
  
  subjectMap.forEach((data, subject) => {
    const percentage = (data.correct / data.total) * 100;
    
    // Find weak topics (< 60% accuracy)
    const weakTopics: string[] = [];
    data.topics.forEach((topicData, topic) => {
      const topicPercentage = (topicData.correct / topicData.total) * 100;
      if (topicPercentage < 60) {
        weakTopics.push(topic);
      }
    });
    
    // Generate recommendations based on performance
    const recommendations: string[] = [];
    if (percentage < 50) {
      recommendations.push(`Focus on ${subject} fundamentals`);
      recommendations.push(`Practice more ${subject} questions daily`);
    } else if (percentage < 70) {
      recommendations.push(`Review ${subject} concepts and practice`);
    }
    
    if (weakTopics.length > 0) {
      recommendations.push(`Pay special attention to: ${weakTopics.join(', ')}`);
    }
    
    result[subject] = {
      score: data.correct,
      total: data.total,
      percentage: Math.round(percentage),
      weak_topics: weakTopics,
      recommendations
    };
  });

  return result;
}