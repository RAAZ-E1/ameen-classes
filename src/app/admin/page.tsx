'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
// Temporary simple alert component
const Alert = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative w-full rounded-lg border p-4 bg-blue-50 border-blue-200 text-blue-800 ${className}`} role="alert">
        {children}
    </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
    <div className="text-sm leading-relaxed">{children}</div>
);
import { Lock, Plus, BarChart3, FileText, Users, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [stats, setStats] = useState<{
        totalQuestions: number;
        testAttempts: number;
        avgScore: number;
        subjects: number;
        subjectStats?: Array<{ _id: string; count: number }>;
        examTypeStats?: Array<{ _id: string; count: number }>;
        difficultyStats?: Array<{ _id: string; count: number }>;
        lastUpdated?: string;
    } | null>(null);
    const [results, setResults] = useState<Array<{
        id?: string;
        studentName: string;
        examType: string;
        subject: string;
        score: number;
        correctAnswers: number;
        totalQuestions: number;
        timeTaken: string;
        difficulty: string;
        completedAt: string;
    }>>([]);

    // Question form state with persistence
    const [questionForm, setQuestionForm] = useState(() => {
        // Load saved form data from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('adminFormDefaults');
            if (saved) {
                const defaults = JSON.parse(saved);
                return {
                    examType: defaults.examType || '',
                    class: defaults.class || '',
                    subject: defaults.subject || '',
                    chapter: defaults.chapter || '',
                    questionText: '',
                    options: ['', '', '', ''],
                    correctAnswer: 0,
                    explanation: '',
                    difficulty: defaults.difficulty || 'medium'
                };
            }
        }
        return {
            examType: '',
            class: '',
            subject: '',
            chapter: '',
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            explanation: '',
            difficulty: 'medium'
        };
    });

    const fetchStats = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/auth');
            const result = await response.json();
            setIsAuthenticated(result.authenticated);
            if (result.authenticated) {
                fetchStats();
            }
        } catch (err) {
            console.error('Auth check failed:', err);
        }
    }, [fetchStats]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const fetchResults = async () => {
        try {
            const response = await fetch('/api/admin/results');
            if (response.ok) {
                const data = await response.json();
                setResults(data.results || []);
            }
        } catch (err) {
            console.error('Failed to fetch results:', err);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const result = await response.json();

            if (result.success) {
                setIsAuthenticated(true);
                setMessage('Login successful!');
                fetchStats();
            } else {
                setMessage('Invalid password');
            }
        } catch (_err) {
            setMessage('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            setIsAuthenticated(false);
            setPassword('');
            setStats(null);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleQuestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionForm)
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Question added successfully!');
                
                // Save current form defaults
                saveFormDefaults();
                
                // Reset only question-specific fields, keep exam/class/subject/chapter
                setQuestionForm(prev => ({
                    ...prev, // Keep examType, class, subject, chapter, difficulty
                    questionText: '',
                    options: ['', '', '', ''],
                    correctAnswer: 0,
                    explanation: ''
                }));
                fetchStats();
            } else {
                setMessage(result.error || 'Failed to add question');
            }
        } catch (_err) {
            setMessage('Failed to add question');
        } finally {
            setLoading(false);
        }
    };

    // Text formatting function
    const formatText = (text: string) => {
        return text
            .trim() // Remove leading/trailing spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\n\s*\n/g, '\n') // Remove empty lines
            .replace(/^\s+|\s+$/gm, ''); // Remove leading/trailing spaces from each line
    };

    // Save form defaults to localStorage
    const saveFormDefaults = useCallback(() => {
        if (typeof window !== 'undefined') {
            const defaults = {
                examType: questionForm.examType,
                class: questionForm.class,
                subject: questionForm.subject,
                chapter: questionForm.chapter,
                difficulty: questionForm.difficulty
            };
            localStorage.setItem('adminFormDefaults', JSON.stringify(defaults));
        }
    }, [questionForm.examType, questionForm.class, questionForm.subject, questionForm.chapter, questionForm.difficulty]);

    // Auto-save defaults when key fields change
    useEffect(() => {
        if (questionForm.examType && questionForm.class && questionForm.subject) {
            saveFormDefaults();
        }
    }, [questionForm.examType, questionForm.class, questionForm.subject, saveFormDefaults]);

    // Update option with formatting
    const updateOption = (index: number, value: string) => {
        const newOptions = [...questionForm.options];
        newOptions[index] = formatText(value);
        setQuestionForm({ ...questionForm, options: newOptions });
    };

    // Handle question text change with formatting
    const handleQuestionTextChange = (value: string) => {
        const formattedText = formatText(value);
        setQuestionForm({ ...questionForm, questionText: formattedText });
    };

    // Handle explanation change with formatting
    const handleExplanationChange = (value: string) => {
        const formattedText = formatText(value);
        setQuestionForm({ ...questionForm, explanation: formattedText });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle>Admin Login</CardTitle>
                        <CardDescription>Enter your admin password to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            {message && (
                                <Alert>
                                    <AlertDescription>{message}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-gray-600">Manage questions and view results</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        Logout
                    </Button>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Questions</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions || 0}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Users className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Test Attempts</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.testAttempts || 0}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Avg Score</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.avgScore || 0}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <BarChart3 className="h-8 w-8 text-purple-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Subjects</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.subjects || 0}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Main Content */}
                <Tabs defaultValue="add-question" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="add-question">Add Question</TabsTrigger>
                        <TabsTrigger value="results">View Results</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="add-question">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Add New Question
                                </CardTitle>
                                <CardDescription>
                                    Create a new question for the question bank
                                </CardDescription>
                                {(questionForm.examType || questionForm.class || questionForm.subject) && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <Badge variant="outline">
                                            {questionForm.examType} - Class {questionForm.class} - {questionForm.subject}
                                        </Badge>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setQuestionForm(prev => ({
                                                    ...prev,
                                                    examType: '',
                                                    class: '',
                                                    subject: '',
                                                    chapter: ''
                                                }));
                                                // Clear saved defaults
                                                if (typeof window !== 'undefined') {
                                                    localStorage.removeItem('adminFormDefaults');
                                                }
                                            }}
                                        >
                                            Change Settings
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleQuestionSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="examType">Exam Type</Label>
                                            <Select value={questionForm.examType} onValueChange={(value) => setQuestionForm({ ...questionForm, examType: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select exam type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="NEET">NEET</SelectItem>
                                                    <SelectItem value="JEE">JEE</SelectItem>
                                                    <SelectItem value="CBSE">CBSE</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="class">Class</Label>
                                            <Select value={questionForm.class} onValueChange={(value) => setQuestionForm({ ...questionForm, class: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select class" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="11">Class 11</SelectItem>
                                                    <SelectItem value="12">Class 12</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="subject">Subject</Label>
                                            <Select value={questionForm.subject} onValueChange={(value) => setQuestionForm({ ...questionForm, subject: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Physics">Physics</SelectItem>
                                                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                                                    <SelectItem value="Biology">Biology</SelectItem>
                                                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="chapter">Chapter</Label>
                                            <Input
                                                id="chapter"
                                                value={questionForm.chapter}
                                                onChange={(e) => setQuestionForm({ ...questionForm, chapter: e.target.value })}
                                                placeholder="Enter chapter name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="difficulty">Difficulty</Label>
                                            <Select value={questionForm.difficulty} onValueChange={(value) => setQuestionForm({ ...questionForm, difficulty: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="questionText">Question</Label>
                                        <p className="text-xs text-gray-500 mb-1">
                                            💡 Tip: Extra spaces and formatting will be automatically cleaned up when you paste or type
                                        </p>
                                        <Textarea
                                            id="questionText"
                                            value={questionForm.questionText}
                                            onChange={(e) => handleQuestionTextChange(e.target.value)}
                                            placeholder="Enter the question text"
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label>Options</Label>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Click the ✓/✗ button to mark the correct answer. Text will be auto-formatted.
                                        </p>
                                        <div className="space-y-2">
                                            {questionForm.options.map((option, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Badge variant={questionForm.correctAnswer === index ? "default" : "outline"}>
                                                        {String.fromCharCode(65 + index)}
                                                    </Badge>
                                                    <Input
                                                        value={option}
                                                        onChange={(e) => updateOption(index, e.target.value)}
                                                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                                        required
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant={questionForm.correctAnswer === index ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setQuestionForm({ ...questionForm, correctAnswer: index })}
                                                    >
                                                        {questionForm.correctAnswer === index ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="explanation">Explanation (Optional)</Label>
                                        <Textarea
                                            id="explanation"
                                            value={questionForm.explanation}
                                            onChange={(e) => handleExplanationChange(e.target.value)}
                                            placeholder="Enter explanation for the correct answer"
                                            rows={2}
                                        />
                                    </div>

                                    {message && (
                                        <Alert>
                                            <AlertDescription>{message}</AlertDescription>
                                        </Alert>
                                    )}

                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading ? 'Adding Question...' : 'Add Question'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="results">
                        <Card>
                            <CardHeader>
                                <CardTitle>Test Results</CardTitle>
                                <CardDescription>View and analyze test results</CardDescription>
                                <Button onClick={fetchResults} variant="outline" size="sm">
                                    Refresh Results
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {results.length > 0 ? (
                                    <div className="space-y-4">
                                        {results.map((result, index) => (
                                            <div key={result.id || index} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold">{result.studentName}</h3>
                                                        <p className="text-sm text-gray-600">
                                                            {result.examType} - {result.subject}
                                                        </p>
                                                    </div>
                                                    <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}>
                                                        {result.score}%
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Score:</span>
                                                        <span className="ml-1 font-medium">{result.correctAnswers}/{result.totalQuestions}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Time:</span>
                                                        <span className="ml-1 font-medium">{result.timeTaken}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Difficulty:</span>
                                                        <span className="ml-1 font-medium capitalize">{result.difficulty}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Date:</span>
                                                        <span className="ml-1 font-medium">
                                                            {new Date(result.completedAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No test results available. Click &quot;Refresh Results&quot; to load data.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subject Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats?.subjectStats && stats.subjectStats.length > 0 ? (
                                        <div className="space-y-3">
                                            {stats.subjectStats.map((subject, index: number) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="font-medium">{subject._id}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${(subject.count / stats.totalQuestions) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-600">{subject.count}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">No subject data available</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Exam Type Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats?.examTypeStats && stats.examTypeStats.length > 0 ? (
                                        <div className="space-y-3">
                                            {stats.examTypeStats.map((exam, index: number) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="font-medium">{exam._id}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-green-600 h-2 rounded-full"
                                                                style={{ width: `${(exam.count / stats.totalQuestions) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-600">{exam.count}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">No exam type data available</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Difficulty Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats?.difficultyStats && stats.difficultyStats.length > 0 ? (
                                        <div className="space-y-3">
                                            {stats.difficultyStats.map((difficulty, index: number) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="font-medium capitalize">{difficulty._id}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-purple-600 h-2 rounded-full"
                                                                style={{ width: `${(difficulty.count / stats.totalQuestions) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-600">{difficulty.count}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">No difficulty data available</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Questions:</span>
                                            <span className="font-semibold">{stats?.totalQuestions || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Unique Subjects:</span>
                                            <span className="font-semibold">{stats?.subjects || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Test Attempts:</span>
                                            <span className="font-semibold">{stats?.testAttempts || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Average Score:</span>
                                            <span className="font-semibold">{stats?.avgScore || 0}%</span>
                                        </div>
                                        {stats?.lastUpdated && (
                                            <div className="pt-2 border-t">
                                                <span className="text-xs text-gray-500">
                                                    Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}