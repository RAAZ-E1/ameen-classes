import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        console.log('🔍 Debug endpoint called');

        const readyStateMap: Record<number, string> = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        const debugInfo: Record<string, unknown> = {
            timestamp: new Date().toISOString(),
            environment: {
                nodeEnv: process.env.NODE_ENV,
                vercelEnv: process.env.VERCEL_ENV || 'local',
                hasMongoUri: !!process.env.MONGODB_URI,
                mongoUriLength: process.env.MONGODB_URI?.length || 0,
                mongoUriStart: process.env.MONGODB_URI?.substring(0, 20) + '...' || 'Not set'
            },
            mongoose: {
                version: mongoose.version,
                readyState: mongoose.connection.readyState,
                readyStateText: readyStateMap[mongoose.connection.readyState] || 'unknown'
            }
        };

        console.log('Debug info:', debugInfo);

        // Test database connection
        let connectionTest = 'not_attempted';
        try {
            console.log('🔗 Testing database connection...');
            const connection = await connectDB();

            if (connection && mongoose.connection.readyState === 1) {
                connectionTest = 'success';
                debugInfo.mongoose.readyState = mongoose.connection.readyState;
                debugInfo.mongoose.readyStateText = 'connected';
            } else {
                connectionTest = 'failed';
            }
        } catch (error) {
            connectionTest = 'error';
            debugInfo.connectionError = error instanceof Error ? error.message : 'Unknown error';
        }

        return NextResponse.json({
            ...debugInfo,
            connectionTest,
            message: 'Debug information collected successfully'
        });

    } catch (error) {
        console.error('Debug endpoint error:', error);

        return NextResponse.json({
            error: 'Debug endpoint failed',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}