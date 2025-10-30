'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, BookOpen } from 'lucide-react';

type ClassKey = 'class10' | 'class12';
type BoardKey = 'cbse' | 'mh';

export default function FoundationPapersPage() {
  const [selectedClass, setSelectedClass] = useState<ClassKey>('class10');
  const [selectedBoard, setSelectedBoard] = useState<BoardKey>('cbse');

  const classes = {
    class10: {
      name: 'Class 10th',
      subjects: {
        mathematics: { name: 'Mathematics', icon: '🔢' },
        science: { name: 'Science', icon: '🧪' },
        english: { name: 'English', icon: '📚' },
        socialscience: { name: 'Social Science', icon: '🌍' }
      }
    },
    class12: {
      name: 'Class 12th',
      subjects: {
        physics: { name: 'Physics', icon: '⚛️' },
        chemistry: { name: 'Chemistry', icon: '🧪' },
        biology: { name: 'Biology', icon: '🧬' },
        mathematics: { name: 'Mathematics', icon: '🔢' },
        english: { name: 'English', icon: '📚' }
      }
    }
  };

  const boards = {
    cbse: { name: 'CBSE', color: 'bg-blue-100 text-blue-800' },
    mh: { name: 'MH Board', color: 'bg-green-100 text-green-800' }
  };

  // Generate papers for each subject
  const generatePapers = (subjectKey: string, boardKey: BoardKey) => {
    const years = ['2024', '2023', '2022', '2021', '2020'];
    const practiceYears = ['2024 Set 1', '2024 Set 2', '2024 Set 3', '2024 Set 4', '2024 Set 5'];

    const previousYearPapers = years.map((year) => ({
      id: `${subjectKey}_${boardKey}_${year}`,
      title: `${boards[boardKey].name} ${year}`,
      year,
      type: 'Previous Year' as const,
      board: boards[boardKey].name
    }));

    const practicePapers = practiceYears.map((yearSet, index) => ({
      id: `${subjectKey}_practice_${index}`,
      title: `Practice Paper ${yearSet}`,
      year: '2024',
      type: 'New Practice' as const,
      board: 'Practice'
    }));

    return [...previousYearPapers, ...practicePapers];
  };

  const handleDownload = (title: string) => {
    alert(`Downloading: ${title}\n\nNote: This is a demo. PDF will be available soon.`);
  };

  const currentClass = classes[selectedClass];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <BookOpen className="mr-2 h-4 w-4" />
            Foundation Papers
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Class 10th & 12th Question Papers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download CBSE & MH Board previous year papers (2020-2024) and new practice papers.
          </p>
        </div>

        {/* Class & Board Selection */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {/* Class Selection */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {Object.entries(classes).map(([key, classInfo]) => (
              <button
                key={key}
                onClick={() => setSelectedClass(key as ClassKey)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedClass === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {classInfo.name}
              </button>
            ))}
          </div>

          {/* Board Selection */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {Object.entries(boards).map(([key, board]) => (
              <button
                key={key}
                onClick={() => setSelectedBoard(key as BoardKey)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedBoard === key
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {board.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Tabs */}
        <Tabs value={Object.keys(currentClass.subjects)[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 mb-8">
            {Object.entries(currentClass.subjects).map(([key, subject]) => (
              <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                <span className="mr-1 sm:mr-2">{subject.icon}</span>
                <span className="hidden sm:inline">{subject.name}</span>
                <span className="sm:hidden">{subject.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(currentClass.subjects).map(([subjectKey, subject]) => (
            <TabsContent key={subjectKey} value={subjectKey}>
              <div className="space-y-8">
                {/* Previous Year Papers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">{subject.icon}</span>
                    {subject.name} - Previous Year Papers (2020-2024)
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {generatePapers(subjectKey, selectedBoard)
                      .filter(paper => paper.type === 'Previous Year')
                      .map((paper) => (
                        <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={boards[selectedBoard].color}>
                                {paper.board}
                              </Badge>
                              <span className="text-lg">{subject.icon}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{paper.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{paper.year}</p>
                            <Button
                              onClick={() => handleDownload(`${subject.name} ${paper.title}`)}
                              className="w-full"
                              size="sm"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* New Practice Papers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📝</span>
                    New Practice Papers (5 Sets)
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {generatePapers(subjectKey, selectedBoard)
                      .filter(paper => paper.type === 'New Practice')
                      .map((paper) => (
                        <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-purple-100 text-purple-800">
                                Practice
                              </Badge>
                              <span className="text-lg">{subject.icon}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{paper.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">Latest Pattern</p>
                            <Button
                              onClick={() => handleDownload(`${subject.name} ${paper.title}`)}
                              className="w-full"
                              size="sm"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">10</div>
            <div className="text-sm text-gray-600">Previous Year Papers</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-gray-600">New Practice Sets</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-gray-600">Boards Covered</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-orange-600">Free</div>
            <div className="text-sm text-gray-600">Download</div>
          </div>
        </div>
      </div>
    </div>
  );
}