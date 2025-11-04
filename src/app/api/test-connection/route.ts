import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
    try {
        console.log('🧪 Testing MongoDB connection...');

        // Check environment variables
        const hasMongoUri = !!process.env.MONGODB_URI;
        const mongoUri = process.env.MONGODB_URI ? 'Set' : 'Not set';

        console.log('Environment check:', { hasMongoUri, mongoUri });

        if (!hasMongoUri) {
            return NextResponse.json({
                success: false,
                error: 'MONGODB_URI not configured',
                details: 'Environment variable is missing'
            }, { status: 500 });
        }

        // Test connection
        await connectDB();

        // Check connection state
        const connectionState = mongoose.connection.readyState;
        const states: Record<number, string> = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        const result = {
            success: connectionState === 1,
            connectionState: states[connectionState] || 'unknown',
            database: mongoose.connection.db?.databaseName || 'unknown',
            host: mongoose.connection.host || 'unknown',
            timestamp: new Date().toISOString()
        };

        console.log('🧪 Connection test result:', result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('🧪 Connection test failed:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorType = error instanceof Error ? error.constructor.name : 'Unknown';

        return NextResponse.json({
            success: false,
            error: errorMessage,
            type: errorType,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}