import Groq from 'groq-sdk';
import { StudentAnswer, TestAnalysis, analyzeSubjectPerformance, calculateGrade } from './rag-utils';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

export class GroqAnalysisService {
  /**
   * Analyze test results using Groq AI for detailed feedback
   */
  async analyzeTestResults(
    examType: 'NEET' | 'JEE',
    studentAnswers: StudentAnswer[]
  ): Promise<TestAnalysis | null> {
    try {
      // Basic analysis without AI
      const basicAnalysis = this.generateBasicAnalysis(studentAnswers);
      
      // Enhanced analysis with Groq AI
      const aiAnalysis = await this.getAIAnalysis(examType, studentAnswers, basicAnalysis);
      
      return {
        ...basicAnalysis,
        detailed_feedback: aiAnalysis.detailed_feedback,
        study_plan: aiAnalysis.study_plan
      };
    } catch (error) {
      console.error('Error in Groq analysis:', error);
      // Return basic analysis as fallback
      return this.generateBasicAnalysis(studentAnswers);
    }
  }

  /**
   * Generate basic analysis without AI
   */
  private generateBasicAnalysis(studentAnswers: StudentAnswer[]): TestAnalysis {
    const totalQuestions = studentAnswers.length;
    const correctAnswers = studentAnswers.filter(a => a.is_correct).length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const grade = calculateGrade(scorePercentage);
    
    // Subject-wise analysis
    const subjectAnalysis = analyzeSubjectPerformance(studentAnswers);
    
    // Identify strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    Object.entries(subjectAnalysis).forEach(([subject, data]) => {
      if (data.percentage >= 70) {
        strengths.push(subject);
      } else if (data.percentage < 50) {
        weaknesses.push(subject);
      }
    });

    return {
      overall_performance: {
        score_percentage: Math.round(scorePercentage),
        grade,
        strengths,
        weaknesses
      },
      subject_analysis: subjectAnalysis,
      detailed_feedback: `You scored ${correctAnswers} out of ${totalQuestions} questions correctly (${scorePercentage.toFixed(1)}%).`,
      study_plan: {
        priority_subjects: weaknesses,
        recommended_topics: [],
        study_hours_per_week: scorePercentage < 60 ? 15 : scorePercentage < 80 ? 10 : 5,
        focus_areas: weaknesses
      }
    };
  }

  /**
   * Get enhanced analysis from Groq AI
   */
  private async getAIAnalysis(
    examType: 'NEET' | 'JEE',
    studentAnswers: StudentAnswer[],
    basicAnalysis: TestAnalysis
  ): Promise<{ detailed_feedback: string; study_plan: TestAnalysis['study_plan'] }> {
    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      return {
        detailed_feedback: basicAnalysis.detailed_feedback,
        study_plan: basicAnalysis.study_plan
      };
    }

    try {
      const prompt = this.createAnalysisPrompt(examType, studentAnswers, basicAnalysis);
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert ${examType} exam coach. Analyze the student's performance and provide detailed, actionable feedback and study recommendations.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 0.3,
        max_tokens: 1000
      });

      const aiResponse = completion.choices[0]?.message?.content;
      
      if (aiResponse) {
        return this.parseAIResponse(aiResponse, basicAnalysis);
      }
      
      throw new Error('No response from Groq');
    } catch (error) {
      console.error('Groq AI analysis failed:', error);
      return {
        detailed_feedback: basicAnalysis.detailed_feedback,
        study_plan: basicAnalysis.study_plan
      };
    }
  }

  /**
   * Create analysis prompt for Groq
   */
  private createAnalysisPrompt(
    examType: 'NEET' | 'JEE',
    studentAnswers: StudentAnswer[],
    basicAnalysis: TestAnalysis
  ): string {
    const totalQuestions = studentAnswers.length;
    const correctAnswers = studentAnswers.filter(a => a.is_correct).length;
    const scorePercentage = basicAnalysis.overall_performance.score_percentage;

    // Get subject breakdown
    const subjectBreakdown = Object.entries(basicAnalysis.subject_analysis)
      .map(([subject, data]) => `${subject}: ${data.score}/${data.total} (${data.percentage}%)`)
      .join(', ');

    // Get incorrect questions by topic
    const incorrectQuestions = studentAnswers
      .filter(a => !a.is_correct)
      .map(a => `${a.question_data.subject} - ${a.question_data.topic || 'General'}`)
      .slice(0, 10); // Limit to avoid token overflow

    return `
Analyze this ${examType} mock test performance:

PERFORMANCE SUMMARY:
- Overall Score: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)
- Subject Breakdown: ${subjectBreakdown}
- Time Taken: ${Math.floor(basicAnalysis.study_plan.study_hours_per_week)} minutes

INCORRECT TOPICS:
${incorrectQuestions.join(', ')}

Please provide:
1. DETAILED FEEDBACK: Specific insights about performance patterns, strengths, and areas needing improvement
2. STUDY PLAN: Recommended topics to focus on, study hours per week, and specific focus areas

Format your response as:
FEEDBACK: [detailed analysis]
STUDY_PLAN: [specific recommendations]
PRIORITY_TOPICS: [comma-separated list]
FOCUS_AREAS: [comma-separated list]
STUDY_HOURS: [number]
`;
  }

  /**
   * Parse AI response into structured format
   */
  private parseAIResponse(aiResponse: string, basicAnalysis: TestAnalysis): { detailed_feedback: string; study_plan: TestAnalysis['study_plan'] } {
    try {
      const feedbackMatch = aiResponse.match(/FEEDBACK:\s*([\s\S]*?)(?=STUDY_PLAN:|$)/);
      // const studyPlanMatch = aiResponse.match(/STUDY_PLAN:\s*([\s\S]*?)(?=PRIORITY_TOPICS:|$)/);
      const priorityTopicsMatch = aiResponse.match(/PRIORITY_TOPICS:\s*([\s\S]*?)(?=FOCUS_AREAS:|$)/);
      const focusAreasMatch = aiResponse.match(/FOCUS_AREAS:\s*([\s\S]*?)(?=STUDY_HOURS:|$)/);
      const studyHoursMatch = aiResponse.match(/STUDY_HOURS:\s*(\d+)/);

      const detailed_feedback = feedbackMatch?.[1]?.trim() || basicAnalysis.detailed_feedback;
      
      const priority_topics = priorityTopicsMatch?.[1]?.trim().split(',').map(t => t.trim()) || basicAnalysis.study_plan.recommended_topics;
      const focus_areas = focusAreasMatch?.[1]?.trim().split(',').map(t => t.trim()) || basicAnalysis.study_plan.focus_areas;
      const study_hours = studyHoursMatch?.[1] ? parseInt(studyHoursMatch[1]) : basicAnalysis.study_plan.study_hours_per_week;

      return {
        detailed_feedback,
        study_plan: {
          priority_subjects: basicAnalysis.study_plan.priority_subjects,
          recommended_topics: priority_topics,
          study_hours_per_week: study_hours,
          focus_areas
        }
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return {
        detailed_feedback: basicAnalysis.detailed_feedback,
        study_plan: basicAnalysis.study_plan
      };
    }
  }

  /**
   * Generate explanation for a specific question using Groq AI
   */
  async explainQuestion(question: { questionText?: string; question?: string; options: string[]; correctAnswer?: number; correct_answer?: number; explanation?: string; exam_type?: string; subject?: string }, userAnswer: number): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      return question.explanation || 'Explanation not available.';
    }

    try {
      const prompt = `
Explain this ${question.exam_type} ${question.subject} question:

QUESTION: ${question.question}
OPTIONS: ${question.options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join(', ')}
CORRECT ANSWER: ${String.fromCharCode(65 + (question.correctAnswer ?? question.correct_answer ?? 0))}
USER SELECTED: ${userAnswer >= 0 ? String.fromCharCode(65 + userAnswer) : 'Not answered'}

Provide a clear, educational explanation covering:
1. Why the correct answer is right
2. Why other options are incorrect (if user got it wrong)
3. Key concepts to remember
4. Tips for similar questions

Keep it concise but comprehensive.
`;

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert ${question.exam_type} tutor. Provide clear, educational explanations for exam questions.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 0.2,
        max_tokens: 500
      });

      return completion.choices[0]?.message?.content || question.explanation || 'Explanation not available.';
    } catch (error) {
      console.error('Error generating explanation:', error);
      return question.explanation || 'Explanation not available.';
    }
  }
}

// Export singleton instance
export const groqAnalysis = new GroqAnalysisService();