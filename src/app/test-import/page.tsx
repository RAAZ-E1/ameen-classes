"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { importBiologyQuestions, checkExistingQuestions } from '@/lib/import-biology-questions';
// Database operations moved to API calls

export default function TestImportPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testImport = async () => {
    setLoading(true);
    setResult('Testing import functionality...\n');
    
    try {
      // Check existing questions
      const existing = await checkExistingQuestions();
      setResult(prev => prev + `Found ${existing.count} existing questions\n`);
      
      // Test import
      const importResult = await importBiologyQuestions();
      setResult(prev => prev + `Import result: ${JSON.stringify(importResult, null, 2)}\n`);
      
      // Test fetching questions
      const response = await fetch('/api/questions?examType=NEET&limit=5');
      const result = await response.json();
      const questions = result.success ? result.questions : null;
      setResult(prev => prev + `Fetched ${questions?.length || 0} questions for testing\n`);
      
      setResult(prev => prev + 'Test completed successfully!');
    } catch (error) {
      setResult(prev => prev + `Error: ${error}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Import Functionality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testImport} disabled={loading}>
              {loading ? 'Testing...' : 'Run Import Test'}
            </Button>
            
            {result && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}