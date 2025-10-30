"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Lightbulb,
    Target,
    BookOpen,
    Zap,
    CheckCircle,
    AlertCircle,
    Info,
    Star
} from "lucide-react";

// Enhanced Typography Components for Better Question Review Experience

interface EnhancedExplanationProps {
    explanation: string;
    type?: 'explanation' | 'concept' | 'solution' | 'note';
    difficulty?: 'easy' | 'medium' | 'hard';
    subject?: string;
}

export const EnhancedExplanation: React.FC<EnhancedExplanationProps> = ({
    explanation,
    type = 'explanation',
    difficulty = 'medium',
    subject = ''
}) => {
    const getTypeConfig = () => {
        switch (type) {
            case 'explanation':
                return {
                    icon: <Lightbulb className="h-5 w-5" />,
                    bgGradient: 'from-yellow-50 to-orange-50',
                    borderColor: 'border-yellow-400',
                    iconColor: 'text-yellow-600',
                    textColor: 'text-gray-800'
                };
            case 'concept':
                return {
                    icon: <BookOpen className="h-5 w-5" />,
                    bgGradient: 'from-blue-50 to-indigo-50',
                    borderColor: 'border-blue-400',
                    iconColor: 'text-blue-600',
                    textColor: 'text-blue-900'
                };
            case 'solution':
                return {
                    icon: <CheckCircle className="h-5 w-5" />,
                    bgGradient: 'from-green-50 to-emerald-50',
                    borderColor: 'border-green-400',
                    iconColor: 'text-green-600',
                    textColor: 'text-green-900'
                };
            case 'note':
                return {
                    icon: <Info className="h-5 w-5" />,
                    bgGradient: 'from-purple-50 to-violet-50',
                    borderColor: 'border-purple-400',
                    iconColor: 'text-purple-600',
                    textColor: 'text-purple-900'
                };
            default:
                return {
                    icon: <Lightbulb className="h-5 w-5" />,
                    bgGradient: 'from-gray-50 to-gray-100',
                    borderColor: 'border-gray-400',
                    iconColor: 'text-gray-600',
                    textColor: 'text-gray-800'
                };
        }
    };

    const config = getTypeConfig();

    // Parse explanation into structured content
    const parseExplanation = (text: string) => {
        // Split by double newlines for paragraphs
        const paragraphs = text.split('\n\n').filter(p => p.trim());

        return paragraphs.map((paragraph, index) => {
            // Check if paragraph contains bullet points or numbered lists
            if (paragraph.includes('•') || paragraph.match(/^\d+\./m)) {
                const lines = paragraph.split('\n');
                return {
                    type: 'list',
                    content: lines,
                    index
                };
            }

            // Check if paragraph contains formulas (simple detection)
            if (paragraph.includes('=') && paragraph.match(/[A-Za-z]\s*=\s*[A-Za-z0-9]/)) {
                return {
                    type: 'formula',
                    content: paragraph,
                    index
                };
            }

            return {
                type: 'paragraph',
                content: paragraph,
                index
            };
        });
    };

    const structuredContent = parseExplanation(explanation);

    return (
        <div className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-lg border-l-4 ${config.borderColor}`}>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className={config.iconColor}>
                            {config.icon}
                        </div>
                        <span className={`font-semibold ${config.textColor} capitalize`}>
                            {type} {subject && `- ${subject}`}
                        </span>
                    </div>
                    {difficulty && (
                        <Badge
                            variant={difficulty === 'easy' ? 'secondary' : difficulty === 'medium' ? 'default' : 'destructive'}
                            className="text-xs"
                        >
                            {difficulty}
                        </Badge>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    {structuredContent.map((item) => {
                        switch (item.type) {
                            case 'list':
                                return (
                                    <div key={item.index} className="space-y-1">
                                        {(item.content as string[]).map((line, lineIndex) => (
                                            <div key={lineIndex} className={`${config.textColor} leading-7`}>
                                                {line.trim() && (
                                                    <div className="flex items-start space-x-2">
                                                        <div className="flex-shrink-0 mt-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${config.iconColor.replace('text-', 'bg-')}`} />
                                                        </div>
                                                        <span className="font-medium">{line.replace(/^[•\d+\.]\s*/, '')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'formula':
                                return (
                                    <div key={item.index} className="my-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                            <code className="font-mono text-lg font-bold text-gray-800 bg-blue-50 px-3 py-2 rounded">
                                                {item.content as string}
                                            </code>
                                        </div>
                                    </div>
                                );
                            case 'paragraph':
                            default:
                                return (
                                    <p key={item.index} className={`${config.textColor} leading-7 font-medium text-base`}>
                                        {item.content as string}
                                    </p>
                                );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

interface KeyPointsBoxProps {
    points: string[];
    title?: string;
    type?: 'tips' | 'important' | 'remember' | 'warning';
}

export const KeyPointsBox: React.FC<KeyPointsBoxProps> = ({
    points,
    title = "Key Points to Remember",
    type = 'remember'
}) => {
    const getTypeConfig = () => {
        switch (type) {
            case 'tips':
                return {
                    icon: <Zap className="h-4 w-4" />,
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200',
                    textColor: 'text-yellow-800',
                    iconColor: 'text-yellow-600'
                };
            case 'important':
                return {
                    icon: <Star className="h-4 w-4" />,
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    textColor: 'text-red-800',
                    iconColor: 'text-red-600'
                };
            case 'warning':
                return {
                    icon: <AlertCircle className="h-4 w-4" />,
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200',
                    textColor: 'text-orange-800',
                    iconColor: 'text-orange-600'
                };
            case 'remember':
            default:
                return {
                    icon: <Target className="h-4 w-4" />,
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    textColor: 'text-blue-800',
                    iconColor: 'text-blue-600'
                };
        }
    };

    const config = getTypeConfig();

    return (
        <div className={`${config.bgColor} p-4 rounded-lg border ${config.borderColor} mt-4`}>
            <h4 className={`font-semibold ${config.textColor} mb-3 flex items-center`}>
                <span className={config.iconColor}>
                    {config.icon}
                </span>
                <span className="ml-2">{title}</span>
            </h4>
            <ul className={`${config.textColor} space-y-2`}>
                {points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${config.iconColor.replace('text-', 'bg-')}`} />
                        </div>
                        <span className="text-sm font-medium leading-relaxed">{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface ConceptHighlightProps {
    concept: string;
    definition: string;
    difficulty: 'basic' | 'intermediate' | 'advanced';
    relatedTerms?: string[];
}

export const ConceptHighlight: React.FC<ConceptHighlightProps> = ({
    concept,
    definition,
    difficulty,
    relatedTerms = []
}) => {
    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'basic':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    badge: 'bg-green-100 text-green-800'
                };
            case 'intermediate':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    badge: 'bg-yellow-100 text-yellow-800'
                };
            case 'advanced':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    badge: 'bg-red-100 text-red-800'
                };
        }
    };

    const colors = getDifficultyColor();

    return (
        <Card className={`${colors.bg} border-2 ${colors.border}`}>
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className={`font-bold text-lg ${colors.text}`}>{concept}</h4>
                        <Badge className={`${colors.badge} text-xs font-medium`}>
                            {difficulty} level
                        </Badge>
                    </div>

                    <p className={`${colors.text} leading-relaxed font-medium`}>
                        {definition}
                    </p>

                    {relatedTerms.length > 0 && (
                        <div className="pt-2">
                            <div className="text-xs font-semibold text-gray-600 mb-2">Related Terms:</div>
                            <div className="flex flex-wrap gap-1">
                                {relatedTerms.map((term, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {term}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const EnhancedTypographyComponents = {
    EnhancedExplanation,
    KeyPointsBox,
    ConceptHighlight
};

export default EnhancedTypographyComponents;