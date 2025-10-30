'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, CheckCircle } from 'lucide-react';

export default function FreeLearningPage() {
    const [selectedSubject, setSelectedSubject] = useState('math');

    const subjects = {
        math: {
            name: 'Mathematics',
            icon: '🔢',
            topics: [
                { id: 1, title: 'Real Numbers', duration: '45 min', completed: true, lectures: 8 },
                { id: 2, title: 'Polynomials', duration: '52 min', completed: true, lectures: 10 },
                { id: 3, title: 'Linear Equations', duration: '38 min', completed: false, lectures: 7 },
                { id: 4, title: 'Quadratic Equations', duration: '48 min', completed: false, lectures: 9 },
                { id: 5, title: 'Arithmetic Progressions', duration: '42 min', completed: false, lectures: 8 },
                { id: 6, title: 'Triangles', duration: '55 min', completed: false, lectures: 11 },
            ]
        },
        science: {
            name: 'Science',
            icon: '🧪',
            topics: [
                { id: 1, title: 'Light - Reflection and Refraction', duration: '50 min', completed: true, lectures: 12 },
                { id: 2, title: 'Human Eye and Colourful World', duration: '40 min', completed: false, lectures: 8 },
                { id: 3, title: 'Electricity', duration: '60 min', completed: false, lectures: 15 },
                { id: 4, title: 'Magnetic Effects of Electric Current', duration: '45 min', completed: false, lectures: 10 },
                { id: 5, title: 'Our Environment', duration: '35 min', completed: false, lectures: 7 },
                { id: 6, title: 'Management of Natural Resources', duration: '42 min', completed: false, lectures: 9 },
            ]
        },
        english: {
            name: 'English',
            icon: '📚',
            topics: [
                { id: 1, title: 'A Letter to God', duration: '35 min', completed: true, lectures: 5 },
                { id: 2, title: 'Nelson Mandela: Long Walk to Freedom', duration: '40 min', completed: true, lectures: 6 },
                { id: 3, title: 'Two Stories about Flying', duration: '30 min', completed: false, lectures: 4 },
                { id: 4, title: 'From the Diary of Anne Frank', duration: '38 min', completed: false, lectures: 5 },
                { id: 5, title: 'The Hundred Dresses', duration: '45 min', completed: false, lectures: 7 },
                { id: 6, title: 'Glimpses of India', duration: '50 min', completed: false, lectures: 8 },
            ]
        },
        sst: {
            name: 'Social Science',
            icon: '🌍',
            topics: [
                { id: 1, title: 'The Rise of Nationalism in Europe', duration: '55 min', completed: true, lectures: 10 },
                { id: 2, title: 'The Nationalist Movement in Indo-China', duration: '48 min', completed: false, lectures: 8 },
                { id: 3, title: 'Nationalism in India', duration: '62 min', completed: false, lectures: 12 },
                { id: 4, title: 'The Making of a Global World', duration: '45 min', completed: false, lectures: 9 },
                { id: 5, title: 'Resources and Development', duration: '52 min', completed: false, lectures: 11 },
                { id: 6, title: 'Forest and Wildlife Resources', duration: '40 min', completed: false, lectures: 7 },
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Free Video Lectures
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Watch Class 10 video lectures covering all subjects.
                    </p>
                </div>

                {/* Subject Tabs */}
                <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
                        {Object.entries(subjects).map(([key, subject]) => (
                            <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                                <span className="mr-1 sm:mr-2">{subject.icon}</span>
                                <span className="hidden sm:inline">{subject.name}</span>
                                <span className="sm:hidden">{subject.name.split(' ')[0]}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Object.entries(subjects).map(([key, subject]) => (
                        <TabsContent key={key} value={key}>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {subject.topics.map((topic) => (
                                    <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                                                    <p className="text-sm text-gray-600">{topic.duration} • {topic.lectures} lectures</p>
                                                </div>
                                                {topic.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                                            </div>
                                            <Button 
                                                className="w-full" 
                                                variant={topic.completed ? "outline" : "default"}
                                                size="sm"
                                            >
                                                {topic.completed ? (
                                                    <>
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Review
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-4 w-4 mr-2" />
                                                        Start
                                                    </>
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}