'use client';

import { useState } from 'react';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation'; // Removed - not used

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    // const router = useRouter(); // Removed - not used in current implementation

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate authentication (replace with your actual auth logic)
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isSignUp) {
                console.log('Sign up attempt:', { email: formData.email, fullName: formData.fullName });
                // TODO: Implement actual sign up logic with your preferred auth system
                setError('Sign up functionality will be implemented soon. Please use the demo for now.');
            } else {
                console.log('Sign in attempt:', { email: formData.email });
                // TODO: Implement actual sign in logic with your preferred auth system
                setError('Sign in functionality will be implemented soon. Please use the demo for now.');
            }
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md mx-auto"
            >
                <Card className="shadow-xl border-0 rounded-2xl">
                    <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                            {isSignUp ? 'Join Ameen Classes' : 'Welcome Back'}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-gray-600">
                            {isSignUp
                                ? 'Create your free account to start learning'
                                : 'Sign in to continue your learning journey'
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="pl-10"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading
                                    ? 'Please wait...'
                                    : isSignUp ? 'Create Account' : 'Sign In'
                                }
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-purple-600 hover:text-purple-700 text-sm"
                                >
                                    {isSignUp
                                        ? 'Already have an account? Sign In'
                                        : "Don't have an account? Sign Up"
                                    }
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}