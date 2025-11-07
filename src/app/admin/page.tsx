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

    // Render text with LaTeX support
    const renderFormattedText = (text: string, isInline = true) => {
        if (!text) return null;
        
        if (needsLatexRendering(text)) {
            try {
                const latexContent = smartTextToLatex(text);
                return isInline ? (
                    <InlineMath math={latexContent} />
                ) : (
                    <BlockMath math={latexContent} />
                );
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
                        <TabsTrigger value="bulk-upload">Bulk Upload (OCR)</TabsTrigger>
                        <TabsTrigger value="results">View Results</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="add-question" className="px-[10%]">
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

                                    {/* PYQ Toggle Section */}
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <Label className="text-sm font-medium">Previous Year Question (PYQ)</Label>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    PYQ questions will only appear in {questionForm.examType || 'the selected'} exam type
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setQuestionForm({ ...questionForm, isPYQ: !questionForm.isPYQ })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${questionForm.isPYQ ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${questionForm.isPYQ ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {questionForm.isPYQ && (
                                            <div>
                                                <Label htmlFor="pyqYear" className="text-sm">Year (Optional)</Label>
                                                <Input
                                                    id="pyqYear"
                                                    type="number"
                                                    min="2000"
                                                    max={new Date().getFullYear()}
                                                    value={questionForm.pyqYear}
                                                    onChange={(e) => setQuestionForm({ ...questionForm, pyqYear: e.target.value })}
                                                    placeholder="e.g., 2023"
                                                    className="mt-1"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="questionText">Question</Label>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs text-gray-500">
                                                🧪⚛️ Tip: Formulas auto-format with LaTeX rendering
                                            </p>
                                            <div className="flex gap-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => formatQuestionTextOnBlur(questionForm.questionText)}
                                                    title="Apply formatting now"
                                                >
                                                    Format Now
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/* Quick Insert Toolbar */}
                                        <div className="mb-2 p-2 bg-gray-50 rounded border">
                                            <p className="text-xs text-gray-600 mb-1">Quick Insert:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {[
                                                    { label: 'E=mc²', value: 'E=mc^2' },
                                                    { label: 'F=ma', value: 'F=ma' },
                                                    { label: 'v²=u²+2as', value: 'v^2=u^2+2as' },
                                                    { label: 'PV=nRT', value: 'PV=nRT' },
                                                    { label: 'V=IR', value: 'V=IR' },
                                                    { label: 'H₂O', value: 'H2O' },
                                                    { label: 'H₂SO₄', value: 'H2SO4' },
                                                    { label: 'CO₂', value: 'CO2' },
                                                    { label: 'π', value: 'pi' },
                                                    { label: 'θ', value: 'theta' },
                                                    { label: 'λ', value: 'lambda' },
                                                    { label: 'Δ', value: 'delta' },
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
                                                                const newText = questionForm.questionText.substring(0, start) + 
                                                                              item.value + 
                                                                              questionForm.questionText.substring(end);
                                                                setQuestionForm({ ...questionForm, questionText: newText });
                                                                // Focus back to textarea
                                                                setTimeout(() => {
                                                                    textarea.focus();
                                                                    textarea.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                }, 0);
                                                            }
                                                        }}
                                                        title={`Insert ${item.value}`}
                                                    >
                                                        {item.label}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
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
                                            <div className="mt-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                                <p className="text-xs text-blue-700 mb-2 font-medium">📝 Live Preview:</p>
                                                <div className="bg-white p-3 rounded border shadow-sm">
                                                    <div className="text-sm text-gray-900">
                                                        {renderFormattedText(questionForm.questionText, false)}
                                                    </div>
                                                </div>
                                                {needsLatexRendering(questionForm.questionText) && (
                                                    <p className="text-xs text-blue-600 mt-1">✨ LaTeX formatting applied</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Options</Label>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Click the ✓/✗ button to mark the correct answer. Formulas auto-format with LaTeX rendering.
                                        </p>
                                        
                                        {/* Smart Quick Insert for Options */}
                                        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                            <p className="text-xs text-purple-700 mb-2 font-medium">🚀 Smart Quick Insert for Options:</p>
                                            
                                            {/* Subject-specific quick inserts */}
                                            {questionForm.subject === 'Physics' && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-blue-700 mb-1">⚡ Physics Formulas:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {[
                                                            { label: 'F=ma', value: 'F=ma' },
                                                            { label: 'E=mc²', value: 'E=mc^2' },
                                                            { label: 'v=u+at', value: 'v=u+at' },
                                                            { label: 'v²=u²+2as', value: 'v^2=u^2+2as' },
                                                            { label: 'KE=½mv²', value: 'KE=(1/2)mv^2' },
                                                            { label: 'PE=mgh', value: 'PE=mgh' },
                                                            { label: 'V=IR', value: 'V=IR' },
                                                            { label: 'P=VI', value: 'P=VI' },
                                                            { label: 'PV=nRT', value: 'PV=nRT' },
                                                            { label: 'F=kx', value: 'F=kx' },
                                                            { label: 'T=2π√(l/g)', value: 'T=2pi*sqrt(l/g)' },
                                                            { label: 'λf=v', value: 'lambda*f=v' },
                                                        ].map((item, idx) => (
                                                            <Button
                                                                key={idx}
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs h-6 px-2"
                                                                onClick={() => {
                                                                    const focusedInput = document.activeElement as HTMLInputElement;
                                                                    if (focusedInput && focusedInput.tagName === 'INPUT') {
                                                                        const start = focusedInput.selectionStart || 0;
                                                                        const end = focusedInput.selectionEnd || 0;
                                                                        const currentValue = focusedInput.value;
                                                                        const newValue = currentValue.substring(0, start) + item.value + currentValue.substring(end);
                                                                        
                                                                        // Find which option this is
                                                                        const optionIndex = Array.from(document.querySelectorAll('input[placeholder*="Option"]')).indexOf(focusedInput);
                                                                        if (optionIndex >= 0) {
                                                                            updateOption(optionIndex, newValue);
                                                                        }
                                                                        
                                                                        setTimeout(() => {
                                                                            focusedInput.focus();
                                                                            focusedInput.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                        }, 0);
                                                                    }
                                                                }}
                                                                title={`Insert ${item.value}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {questionForm.subject === 'Chemistry' && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-green-700 mb-1">🧪 Chemistry Formulas:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {[
                                                            { label: 'H₂O', value: 'H2O' },
                                                            { label: 'H₂SO₄', value: 'H2SO4' },
                                                            { label: 'HCl', value: 'HCl' },
                                                            { label: 'NaOH', value: 'NaOH' },
                                                            { label: 'CO₂', value: 'CO2' },
                                                            { label: 'NH₃', value: 'NH3' },
                                                            { label: 'CaCO₃', value: 'CaCO3' },
                                                            { label: 'NaCl', value: 'NaCl' },
                                                            { label: 'C₆H₁₂O₆', value: 'C6H12O6' },
                                                            { label: 'CH₄', value: 'CH4' },
                                                            { label: 'Ca(OH)₂', value: 'Ca(OH)2' },
                                                            { label: 'AgNO₃', value: 'AgNO3' },
                                                        ].map((item, idx) => (
                                                            <Button
                                                                key={idx}
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs h-6 px-2"
                                                                onClick={() => {
                                                                    const focusedInput = document.activeElement as HTMLInputElement;
                                                                    if (focusedInput && focusedInput.tagName === 'INPUT') {
                                                                        const start = focusedInput.selectionStart || 0;
                                                                        const end = focusedInput.selectionEnd || 0;
                                                                        const currentValue = focusedInput.value;
                                                                        const newValue = currentValue.substring(0, start) + item.value + currentValue.substring(end);
                                                                        
                                                                        const optionIndex = Array.from(document.querySelectorAll('input[placeholder*="Option"]')).indexOf(focusedInput);
                                                                        if (optionIndex >= 0) {
                                                                            updateOption(optionIndex, newValue);
                                                                        }
                                                                        
                                                                        setTimeout(() => {
                                                                            focusedInput.focus();
                                                                            focusedInput.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                        }, 0);
                                                                    }
                                                                }}
                                                                title={`Insert ${item.value}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {questionForm.subject === 'Mathematics' && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-purple-700 mb-1">📐 Math Symbols:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {[
                                                            { label: 'x²', value: 'x^2' },
                                                            { label: '√x', value: 'sqrt(x)' },
                                                            { label: '½', value: '1/2' },
                                                            { label: '∞', value: 'infinity' },
                                                            { label: 'π', value: 'pi' },
                                                            { label: 'θ', value: 'theta' },
                                                            { label: 'α', value: 'alpha' },
                                                            { label: 'β', value: 'beta' },
                                                            { label: 'Δ', value: 'Delta' },
                                                            { label: '∫', value: 'integral' },
                                                            { label: '∑', value: 'sum' },
                                                            { label: '±', value: '+/-' },
                                                        ].map((item, idx) => (
                                                            <Button
                                                                key={idx}
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs h-6 px-2"
                                                                onClick={() => {
                                                                    const focusedInput = document.activeElement as HTMLInputElement;
                                                                    if (focusedInput && focusedInput.tagName === 'INPUT') {
                                                                        const start = focusedInput.selectionStart || 0;
                                                                        const end = focusedInput.selectionEnd || 0;
                                                                        const currentValue = focusedInput.value;
                                                                        const newValue = currentValue.substring(0, start) + item.value + currentValue.substring(end);
                                                                        
                                                                        const optionIndex = Array.from(document.querySelectorAll('input[placeholder*="Option"]')).indexOf(focusedInput);
                                                                        if (optionIndex >= 0) {
                                                                            updateOption(optionIndex, newValue);
                                                                        }
                                                                        
                                                                        setTimeout(() => {
                                                                            focusedInput.focus();
                                                                            focusedInput.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                        }, 0);
                                                                    }
                                                                }}
                                                                title={`Insert ${item.value}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {questionForm.subject === 'Biology' && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-emerald-700 mb-1">🧬 Biology Terms:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {[
                                                            { label: 'DNA', value: 'DNA' },
                                                            { label: 'RNA', value: 'RNA' },
                                                            { label: 'ATP', value: 'ATP' },
                                                            { label: 'ADP', value: 'ADP' },
                                                            { label: 'NADH', value: 'NADH' },
                                                            { label: 'CO₂', value: 'CO2' },
                                                            { label: 'O₂', value: 'O2' },
                                                            { label: 'H₂O', value: 'H2O' },
                                                            { label: 'C₆H₁₂O₆', value: 'C6H12O6' },
                                                            { label: 'pH', value: 'pH' },
                                                            { label: '°C', value: 'deg C' },
                                                            { label: 'μm', value: 'micro m' },
                                                        ].map((item, idx) => (
                                                            <Button
                                                                key={idx}
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs h-6 px-2"
                                                                onClick={() => {
                                                                    const focusedInput = document.activeElement as HTMLInputElement;
                                                                    if (focusedInput && focusedInput.tagName === 'INPUT') {
                                                                        const start = focusedInput.selectionStart || 0;
                                                                        const end = focusedInput.selectionEnd || 0;
                                                                        const currentValue = focusedInput.value;
                                                                        const newValue = currentValue.substring(0, start) + item.value + currentValue.substring(end);
                                                                        
                                                                        const optionIndex = Array.from(document.querySelectorAll('input[placeholder*="Option"]')).indexOf(focusedInput);
                                                                        if (optionIndex >= 0) {
                                                                            updateOption(optionIndex, newValue);
                                                                        }
                                                                        
                                                                        setTimeout(() => {
                                                                            focusedInput.focus();
                                                                            focusedInput.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                        }, 0);
                                                                    }
                                                                }}
                                                                title={`Insert ${item.value}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Universal symbols for all subjects */}
                                            <div>
                                                <p className="text-xs text-gray-700 mb-1">🌟 Universal Symbols:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {[
                                                        { label: '°', value: 'deg' },
                                                        { label: '±', value: '+/-' },
                                                        { label: '≈', value: 'approx' },
                                                        { label: '≠', value: 'neq' },
                                                        { label: '≤', value: 'leq' },
                                                        { label: '≥', value: 'geq' },
                                                        { label: '×', value: 'times' },
                                                        { label: '÷', value: 'div' },
                                                        { label: '∝', value: 'propto' },
                                                        { label: '%', value: '%' },
                                                    ].map((item, idx) => (
                                                        <Button
                                                            key={idx}
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs h-6 px-2"
                                                            onClick={() => {
                                                                const focusedInput = document.activeElement as HTMLInputElement;
                                                                if (focusedInput && focusedInput.tagName === 'INPUT') {
                                                                    const start = focusedInput.selectionStart || 0;
                                                                    const end = focusedInput.selectionEnd || 0;
                                                                    const currentValue = focusedInput.value;
                                                                    const newValue = currentValue.substring(0, start) + item.value + currentValue.substring(end);
                                                                    
                                                                    const optionIndex = Array.from(document.querySelectorAll('input[placeholder*="Option"]')).indexOf(focusedInput);
                                                                    if (optionIndex >= 0) {
                                                                        updateOption(optionIndex, newValue);
                                                                    }
                                                                    
                                                                    setTimeout(() => {
                                                                        focusedInput.focus();
                                                                        focusedInput.setSelectionRange(start + item.value.length, start + item.value.length);
                                                                    }, 0);
                                                                }
                                                            }}
                                                            title={`Insert ${item.value}`}
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <details className="mb-3">
                                            <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 font-medium">
                                                🧪⚛️📐🧬 Formula & Equation Examples (click to expand)
                                            </summary>
                                            <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-xs">
                                                <div className="grid md:grid-cols-4 gap-4">
                                                    <div>
                                                        <strong className="text-blue-800">Chemistry:</strong>
                                                        <div className="space-y-1 mt-1">
                                                            <div>H2O → {renderFormattedText("H2O", true)}</div>
                                                            <div>H2SO4 → {renderFormattedText("H2SO4", true)}</div>
                                                            <div>Ca(OH)2 → {renderFormattedText("Ca(OH)2", true)}</div>
                                                            <div>C6H12O6 → {renderFormattedText("C6H12O6", true)}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <strong className="text-green-800">Physics:</strong>
                                                        <div className="space-y-1 mt-1">
                                                            <div>F=ma → {renderFormattedText("F=ma", true)}</div>
                                                            <div>E=mc^2 → {renderFormattedText("E=mc^2", true)}</div>
                                                            <div>v=u+at → {renderFormattedText("v=u+at", true)}</div>
                                                            <div>V=IR → {renderFormattedText("V=IR", true)}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <strong className="text-purple-800">Mathematics:</strong>
                                                        <div className="space-y-1 mt-1">
                                                            <div>x^2 → {renderFormattedText("x^2", true)}</div>
                                                            <div>sqrt(x) → {renderFormattedText("sqrt(x)", true)}</div>
                                                            <div>1/2 → {renderFormattedText("1/2", true)}</div>
                                                            <div>pi → {renderFormattedText("pi", true)}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <strong className="text-emerald-800">Biology:</strong>
                                                        <div className="space-y-1 mt-1">
                                                            <div>CO2 → {renderFormattedText("CO2", true)}</div>
                                                            <div>O2 → {renderFormattedText("O2", true)}</div>
                                                            <div>C6H12O6 → {renderFormattedText("C6H12O6", true)}</div>
                                                            <div>pH → {renderFormattedText("pH", true)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 pt-2 border-t border-blue-200">
                                                    <strong className="text-gray-700">Pro Tips:</strong>
                                                    <ul className="mt-1 space-y-1 text-gray-600">
                                                        <li>• Click on any option input field, then use quick insert buttons above</li>
                                                        <li>• Use ^ for superscripts: x^2 becomes x²</li>
                                                        <li>• Chemical formulas auto-format: H2O becomes H₂O</li>
                                                        <li>• Greek letters: alpha, beta, gamma, theta, lambda, pi, omega</li>
                                                        <li>• Fractions: 1/2 becomes ½, (a+b)/(c+d) becomes proper fraction</li>
                                                        <li>• Units: m/s^2, kg*m/s^2, etc. get proper formatting</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </details>
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
                                                            placeholder={`Option ${String.fromCharCode(65 + index)} (click here, then use quick insert buttons above)`}
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

                    <TabsContent value="bulk-upload">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📄 Bulk Upload Questions (OCR)
                                </CardTitle>
                                <CardDescription>
                                    Upload PDF or image files to automatically extract and add questions using AI
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert className="bg-blue-50 border-blue-200">
                                    <AlertDescription>
                                        <strong>How it works:</strong>
                                        <ol className="list-decimal ml-4 mt-2 space-y-1">
                                            <li>Upload a PDF or image file containing questions</li>
                                            <li>AI will extract and parse the questions automatically</li>
                                            <li>Review and edit the extracted questions before saving</li>
                                            <li>Save all questions to the database at once</li>
                                        </ol>
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="bulk-examType">Exam Type</Label>
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
                                        <Label htmlFor="bulk-class">Class</Label>
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
                                        <Label htmlFor="bulk-subject">Subject</Label>
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
                                    <div>
                                        <Label htmlFor="bulk-chapter">Chapter</Label>
                                        <Input
                                            id="bulk-chapter"
                                            value={questionForm.chapter}
                                            onChange={(e) => setQuestionForm({ ...questionForm, chapter: e.target.value })}
                                            placeholder="Enter chapter name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="file-upload">Upload File (PDF or Image)</Label>
                                    <Input
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="mt-2"
                                        disabled={!questionForm.examType || !questionForm.class || !questionForm.subject}
                                    />
                                    {(!questionForm.examType || !questionForm.class || !questionForm.subject) && (
                                        <p className="text-sm text-amber-600 mt-2">
                                            ⚠️ Please select Exam Type, Class, and Subject first
                                        </p>
                                    )}
                                </div>

                                <Button 
                                    type="button" 
                                    className="w-full"
                                    disabled={!questionForm.examType || !questionForm.class || !questionForm.subject || loading}
                                    onClick={async () => {
                                        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                        const file = fileInput?.files?.[0];
                                        
                                        if (!file) {
                                            setMessage('Please select a file');
                                            return;
                                        }

                                        setLoading(true);
                                        setMessage('Processing file with AI... This may take a minute.');

                                        try {
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            formData.append('examType', questionForm.examType);
                                            formData.append('class', questionForm.class);
                                            formData.append('subject', questionForm.subject);
                                            formData.append('chapter', questionForm.chapter);

                                            const response = await fetch('/api/admin/ocr', {
                                                method: 'POST',
                                                body: formData
                                            });

                                            const result = await response.json();

                                            if (result.success && result.questions?.length > 0) {
                                                setMessage(`✅ Successfully extracted ${result.questions.length} questions! Review them below and save to database.`);
                                                // Here you would show the extracted questions for review
                                                console.log('Extracted questions:', result.questions);
                                            } else {
                                                setMessage('❌ No questions could be extracted. Please try a different file or check the format.');
                                            }
                                        } catch (error) {
                                            setMessage('❌ Error processing file: ' + (error instanceof Error ? error.message : 'Unknown error'));
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    {loading ? 'Processing with AI...' : '🤖 Extract Questions with AI'}
                                </Button>

                                {message && (
                                    <Alert className={message.includes('✅') ? 'bg-green-50 border-green-200' : message.includes('❌') ? 'bg-red-50 border-red-200' : ''}>
                                        <AlertDescription>{message}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="border-t pt-6">
                                    <h3 className="font-semibold mb-2">📝 Supported Formats:</h3>
                                    <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
                                        <li><strong>PDF files:</strong> Text-based PDFs with questions</li>
                                        <li><strong>Images:</strong> PNG, JPG, JPEG with clear text</li>
                                        <li><strong>Best results:</strong> Well-formatted questions with clear options (A, B, C, D)</li>
                                    </ul>
                                </div>
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