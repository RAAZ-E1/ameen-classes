'use client';

import { useState, useEffect, useCallback } from 'react';
import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { smartTextToLatex } from '@/lib/math-quiz-utils';
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
                    difficulty: defaults.difficulty || 'medium',
                    isPYQ: false,
                    pyqYear: ''
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
            difficulty: 'medium',
            isPYQ: false,
            pyqYear: ''
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
        } catch {
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
                    ...prev, // Keep examType, class, subject, chapter, difficulty, isPYQ, pyqYear
                    questionText: '',
                    options: ['', '', '', ''],
                    correctAnswer: 0,
                    explanation: ''
                }));
                fetchStats();
            } else {
                setMessage(result.error || 'Failed to add question');
            }
        } catch {
            setMessage('Failed to add question');
        } finally {
            setLoading(false);
        }
    };

    // Enhanced text formatting function using our improved LaTeX system
    const formatText = (text: string) => {
        // First, do basic text cleanup
        const formatted = text
            .trim() // Remove leading/trailing spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\n\s*\n/g, '\n') // Remove empty lines
            .replace(/^\s+|\s+$/gm, ''); // Remove leading/trailing spaces from each line

        return formatted;
    };

    // Check if text needs LaTeX rendering
    const needsLatexRendering = (text: string) => {
        const hasMathSymbols = /[\^_{}\\]|\\[a-zA-Z]+|\$/.test(text);
        const hasPhysicsFormulas = /\b(F\s*=\s*ma|E\s*=\s*mc|v\s*=\s*u\s*\+\s*at|PV\s*=\s*nRT|V\s*=\s*IR|P\s*=\s*VI|F\s*=\s*kx|T\s*=\s*2π|λf\s*=\s*v|n\s*=\s*c\/v)\b/i.test(text);
        const hasChemicalFormulas = /\b([A-Z][a-z]?\d*)+\b|H2O|CO2|NaCl|CaCO3|H2SO4|NH3|CH4|C6H12O6/.test(text);
        const hasUnits = /\b(m\/s|kg|N|J|W|V|A|Ω|Hz|Pa|K|mol|°C|°F)\b/.test(text);
        const hasFractions = /\d+\/\d+/.test(text);
        const hasGreekLetters = /\b(alpha|beta|gamma|delta|epsilon|theta|lambda|mu|pi|sigma|omega|phi|psi|chi|rho|tau)\b/i.test(text);
        const hasBiologyTerms = /\b(DNA|RNA|ATP|ADP|NADH|pH|CO2|O2|H2O|C6H12O6)\b/.test(text);
        
        return hasMathSymbols || hasPhysicsFormulas || hasChemicalFormulas || hasUnits || hasFractions || hasGreekLetters || hasBiologyTerms;
    };

    // Render text with LaTeX support - handles mixed text and formulas
    const renderFormattedText = (text: string, isInline = true) => {
        if (!text) return null;
        
        // Check if text needs LaTeX rendering
        if (needsLatexRendering(text)) {
            try {
                // Check if it's pure formula (no regular text mixed in)
                const isPureFormula = /^[\d\s\+\-\=\^\*\/\(\)a-zA-Z_{}\\]+$/.test(text) && text.length < 50;
                
                if (isPureFormula) {
                    // Pure formula - render as LaTeX
                    const latexContent = smartTextToLatex(text);
                    return isInline ? (
                        <InlineMath math={latexContent} />
                    ) : (
                        <BlockMath math={latexContent} />
                    );
                } else {
                    // Mixed text and formulas - render as text with inline LaTeX for formulas
                    // Split by common formula patterns and render each part
                    const parts = text.split(/(\d+\^[\d\-]+|[A-Z][a-z]?\d+|[A-Z][a-z]?\([A-Z][a-z]?\d?\)\d+|H2O|CO2|SO4|NO3|NH3|ATP|DNA|RNA)/g);
                    
                    return (
                        <span>
                            {parts.map((part, index) => {
                                if (!part) return null;
                                
                                // Check if this part is a formula
                                if (needsLatexRendering(part) && part.length < 20) {
                                    try {
                                        const latexPart = smartTextToLatex(part);
                                        return <InlineMath key={index} math={latexPart} />;
                                    } catch {
                                        return <span key={index}>{part}</span>;
                                    }
                                }
                                
                                // Regular text
                                return <span key={index}>{part}</span>;
                            })}
                        </span>
                    );
                }
            } catch (error) {
                console.warn('LaTeX rendering failed, falling back to text:', error);
                return <span>{formatText(text)}</span>;
            }
        }
        
        return <span>{formatText(text)}</span>;
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

    // Update option without immediate formatting (preserves undo)
    const updateOption = (index: number, value: string) => {
        const newOptions = [...questionForm.options];
        newOptions[index] = value; // No immediate formatting
        setQuestionForm({ ...questionForm, options: newOptions });
    };

    // Format option on blur (when user finishes editing)
    const formatOptionOnBlur = (index: number, value: string) => {
        const newOptions = [...questionForm.options];
        newOptions[index] = formatText(value);
        setQuestionForm({ ...questionForm, options: newOptions });
    };

    // Handle question text change without immediate formatting
    const handleQuestionTextChange = (value: string) => {
        setQuestionForm({ ...questionForm, questionText: value });
    };

    // Format question text on blur
    const formatQuestionTextOnBlur = (value: string) => {
        const formattedText = formatText(value);
        setQuestionForm({ ...questionForm, questionText: formattedText });
    };

    // Handle explanation change without immediate formatting
    const handleExplanationChange = (value: string) => {
        setQuestionForm({ ...questionForm, explanation: value });
    };

    // Format explanation on blur
    const formatExplanationOnBlur = (value: string) => {
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
                        <Card className="max-w-5xl mx-auto">
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
                                        <Badge variant="outline" className="text-sm">
                                            {questionForm.examType} • Class {questionForm.class} • {questionForm.subject}
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
                                            Change
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleQuestionSubmit} className="space-y-8">
                                    {/* Basic Information */}
                                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                                        <h3 className="font-semibold text-sm text-gray-700">Basic Information</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div>
                                                <Label htmlFor="examType" className="text-xs">Exam Type</Label>
                                                <Select value={questionForm.examType} onValueChange={(value) => setQuestionForm({ ...questionForm, examType: value })}>
                                                    <SelectTrigger className="h-9">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="NEET">NEET</SelectItem>
                                                        <SelectItem value="JEE">JEE</SelectItem>
                                                        <SelectItem value="CBSE">CBSE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="class" className="text-xs">Class</Label>
                                                <Select value={questionForm.class} onValueChange={(value) => setQuestionForm({ ...questionForm, class: value })}>
                                                    <SelectTrigger className="h-9">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="11">Class 11</SelectItem>
                                                        <SelectItem value="12">Class 12</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="subject" className="text-xs">Subject</Label>
                                                <Select value={questionForm.subject} onValueChange={(value) => setQuestionForm({ ...questionForm, subject: value })}>
                                                    <SelectTrigger className="h-9">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Physics">Physics</SelectItem>
                                                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                                                        <SelectItem value="Biology">Biology</SelectItem>
                                                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="difficulty" className="text-xs">Difficulty</Label>
                                                <Select value={questionForm.difficulty} onValueChange={(value) => setQuestionForm({ ...questionForm, difficulty: value })}>
                                                    <SelectTrigger className="h-9">
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
                                            <Label htmlFor="chapter" className="text-xs">Chapter Name</Label>
                                            <Input
                                                id="chapter"
                                                className="h-9"
                                                value={questionForm.chapter}
                                                onChange={(e) => setQuestionForm({ ...questionForm, chapter: e.target.value })}
                                                placeholder="Enter chapter name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* PYQ Toggle Section */}
                                    <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <Label className="text-sm font-medium">Previous Year Question</Label>
                                            <button
                                                type="button"
                                                onClick={() => setQuestionForm({ ...questionForm, isPYQ: !questionForm.isPYQ })}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${questionForm.isPYQ ? 'bg-blue-600' : 'bg-gray-300'}`}
                                            >
                                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${questionForm.isPYQ ? 'translate-x-5' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                        {questionForm.isPYQ && (
                                            <Input
                                                id="pyqYear"
                                                type="number"
                                                min="2000"
                                                max={new Date().getFullYear()}
                                                value={questionForm.pyqYear}
                                                onChange={(e) => setQuestionForm({ ...questionForm, pyqYear: e.target.value })}
                                                placeholder="Year (optional)"
                                                className="h-8 w-32"
                                            />
                                        )}
                                    </div>

                                    {/* Question Text */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="questionText">Question Text</Label>
                                            <p className="text-xs text-gray-500">Formulas auto-format</p>
                                        </div>
                                        
                                        <details className="mb-2">
                                            <summary className="text-xs text-blue-600 cursor-pointer hover:underline mb-2">
                                                ➕ Quick Insert Symbols
                                            </summary>
                                            <div className="p-2 bg-gray-50 rounded border mb-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {[
                                                        { label: 'F=ma', value: 'F=ma' },
                                                        { label: 'E=mc²', value: 'E=mc^2' },
                                                        { label: 'V=IR', value: 'V=IR' },
                                                        { label: 'H₂O', value: 'H2O' },
                                                        { label: 'CO₂', value: 'CO2' },
                                                        { label: 'π', value: 'pi' },
                                                        { label: 'θ', value: 'theta' },
                                                        { label: 'λ', value: 'lambda' },
                                                    ].map((item, idx) => (
                                                        <Button
                                                            key={idx}
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs h-6 px-2"
                                                            onClick={() => {
                                                                const textarea = document.getElementById('questionText') as HTMLTextAreaElement;
                                                                if (textarea) {
                                                                    const start = textarea.selectionStart;
                                                                    const end = textarea.selectionEnd;
                                                                    const newText = questionForm.questionText.substring(0, start) + item.value + questionForm.questionText.substring(end);
                                                                    setQuestionForm({ ...questionForm, questionText: newText });
                                                                    setTimeout(() => {
                                                                        textarea.focus();
                                                                        textarea.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                    }, 0);
                                                                }
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </details>

                                        <Textarea
                                            id="questionText"
                                            value={questionForm.questionText}
                                            onChange={(e) => handleQuestionTextChange(e.target.value)}
                                            onBlur={(e) => formatQuestionTextOnBlur(e.target.value)}
                                            placeholder="Enter the question text (e.g., What is the kinetic energy formula KE = 1/2 mv^2?)"
                                            rows={3}
                                            required
                                        />
                                        {questionForm.questionText && (
                                            <div className="p-3 bg-blue-50 rounded border">
                                                <p className="text-xs text-gray-600 mb-1">Preview:</p>
                                                <div className="text-sm">{renderFormattedText(questionForm.questionText, false)}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Options</Label>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Click the ✓/✗ button to mark the correct answer. Formulas auto-format.
                                        </p>
                                        
                                        <div className="space-y-3">
                                            {questionForm.options.map((option, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={questionForm.correctAnswer === index ? "default" : "outline"}>
                                                            {String.fromCharCode(65 + index)}
                                                        </Badge>
                                                        <Input
                                                            value={option}
                                                            onChange={(e) => updateOption(index, e.target.value)}
                                                            onBlur={(e) => formatOptionOnBlur(index, e.target.value)}
                                                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                                            required
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant={questionForm.correctAnswer === index ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => setQuestionForm({ ...questionForm, correctAnswer: index })}
                                                            title={questionForm.correctAnswer === index ? "Correct Answer" : "Mark as Correct"}
                                                        >
                                                            {questionForm.correctAnswer === index ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                    {option && (
                                                        <div className="ml-8 p-2 bg-gray-50 rounded border text-sm">
                                                            <span className="text-xs text-gray-500 mr-2">Preview:</span>
                                                            {renderFormattedText(option, true)}
                                                            {needsLatexRendering(option) && (
                                                                <span className="text-xs text-green-600 ml-2">✨ LaTeX</span>
                                                            )}
                                                        </div>
                                                    )}
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
                                            onBlur={(e) => formatExplanationOnBlur(e.target.value)}
                                            placeholder="Enter explanation for the correct answer (supports formulas like F=ma, H2O, etc.)"
                                            rows={2}
                                        />
                                        {questionForm.explanation && (
                                            <div className="mt-2 p-3 bg-green-50 rounded border border-green-200">
                                                <p className="text-xs text-green-700 mb-1">📖 Explanation Preview:</p>
                                                <div className="text-sm text-gray-900">
                                                    {renderFormattedText(questionForm.explanation, false)}
                                                </div>
                                                {needsLatexRendering(questionForm.explanation) && (
                                                    <p className="text-xs text-green-600 mt-1">✨ LaTeX formatting applied</p>
                                                )}
                                            </div>
                                        )}
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
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
