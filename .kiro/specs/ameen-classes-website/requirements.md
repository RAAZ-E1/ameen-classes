# Requirements Document

## Introduction

The Ameen Classes website is a comprehensive educational platform that provides free Class 10 content and premium courses for competitive exams (NEET, JEE, CLAT). The platform features video lectures, AI-powered mock tests, student dashboards, and authentication systems built with Next.js 14, TypeScript, and Supabase.

## Requirements

### Requirement 1

**User Story:** As a student, I want to access free Class 10 video lectures, so that I can learn without any cost barriers.

#### Acceptance Criteria

1. WHEN a user visits the free learning page THEN the system SHALL display all Class 10 subjects (Math, Science, English, SST)
2. WHEN a user selects a subject THEN the system SHALL show topic-wise video lectures with duration and completion status
3. WHEN a user clicks on a lecture THEN the system SHALL provide access to video content and downloadable notes
4. IF a user is not authenticated THEN the system SHALL still allow access to free content

### Requirement 2

**User Story:** As a student, I want to take AI-powered mock tests, so that I can assess my knowledge and get detailed analysis.

#### Acceptance Criteria

1. WHEN a user accesses mock tests THEN the system SHALL display available test categories with duration and question count
2. WHEN a user starts a test THEN the system SHALL provide a timer, question navigation, and progress tracking
3. WHEN a user completes a test THEN the system SHALL generate detailed results with subject-wise analysis
4. WHEN a user views results THEN the system SHALL provide performance recommendations and improvement suggestions

### Requirement 3

**User Story:** As a student, I want to create an account and track my progress, so that I can monitor my learning journey.

#### Acceptance Criteria

1. WHEN a user signs up THEN the system SHALL create an account using Supabase authentication
2. WHEN a user logs in THEN the system SHALL redirect to a personalized dashboard
3. WHEN a user accesses the dashboard THEN the system SHALL display progress statistics, recent test scores, and study streaks
4. WHEN a user views analytics THEN the system SHALL show performance trends and subject-wise progress charts

### Requirement 4

**User Story:** As a student, I want to explore premium courses (NEET/JEE/CLAT), so that I can access advanced preparation materials.

#### Acceptance Criteria

1. WHEN a user visits the premium page THEN the system SHALL display course options with pricing and features
2. WHEN a user selects a course THEN the system SHALL show detailed curriculum, faculty information, and success stories
3. WHEN a user compares plans THEN the system SHALL provide a feature comparison table between free and premium offerings
4. IF a user wants to enroll THEN the system SHALL provide enrollment options and contact information

### Requirement 5

**User Story:** As a visitor, I want to learn about the institute and faculty, so that I can make informed decisions about joining.

#### Acceptance Criteria

1. WHEN a user visits the about page THEN the system SHALL display company mission, vision, and core values
2. WHEN a user views faculty information THEN the system SHALL show qualifications, experience, and student testimonials
3. WHEN a user checks achievements THEN the system SHALL display statistics like student count, success rate, and ratings
4. WHEN a user views the timeline THEN the system SHALL show the institute's growth journey and milestones

### Requirement 6

**User Story:** As a user, I want a responsive and secure website, so that I can access content safely from any device.

#### Acceptance Criteria

1. WHEN a user accesses the site from any device THEN the system SHALL provide a responsive design that works on mobile, tablet, and desktop
2. WHEN a user interacts with the site THEN the system SHALL implement security measures including rate limiting and input sanitization
3. WHEN a user navigates the site THEN the system SHALL provide smooth animations and fast loading times
4. WHEN a user submits forms THEN the system SHALL validate inputs and prevent XSS attacks