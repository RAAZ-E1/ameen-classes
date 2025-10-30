import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testNextJSBuild() {
  try {
    console.log('🧪 Testing Next.js build process...');
    
    // Test if Next.js can build without errors
    console.log('📦 Running Next.js build check...');
    
    const { stdout, stderr } = await execAsync('npx next build --dry-run', {
      timeout: 30000 // 30 second timeout
    });
    
    if (stderr && !stderr.includes('Warning')) {
      console.error('❌ Build errors found:', stderr);
      return false;
    }
    
    console.log('✅ Next.js build check passed');
    console.log('🎉 Your application should start without MongoDB URI errors');
    
    return true;
    
  } catch (error) {
    console.error('💥 Build test failed:', error.message);
    
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n🔧 Troubleshooting MongoDB URI error:');
      console.log('   1. Check that .env.local contains MONGODB_URI');
      console.log('   2. Restart your development server');
      console.log('   3. Clear Next.js cache: rm -rf .next');
    }
    
    return false;
  }
}

testNextJSBuild();