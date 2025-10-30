#!/usr/bin/env node

/**
 * Security audit script for the application
 * Run with: node scripts/security-audit.js
 */

import fs from 'fs';
import path from 'path';

class SecurityAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.info = [];
  }

  addIssue(type, message, file = null) {
    this.issues.push({ type, message, file, severity: 'high' });
  }

  addWarning(type, message, file = null) {
    this.warnings.push({ type, message, file, severity: 'medium' });
  }

  addInfo(type, message, file = null) {
    this.info.push({ type, message, file, severity: 'low' });
  }

  checkEnvironmentFiles() {
    console.log('🔍 Checking environment files...');
    
    // Check if .env.local exists and has real values
    if (fs.existsSync('.env.local')) {
      const envContent = fs.readFileSync('.env.local', 'utf8');
      
      if (envContent.includes('your_') || envContent.includes('_here')) {
        this.addWarning('env', 'Environment file contains placeholder values', '.env.local');
      }
      
      // Check for exposed secrets in git
      if (envContent.includes('gsk_') || envContent.includes('eyJ')) {
        this.addIssue('env', 'Potential API keys found in environment file', '.env.local');
      }
    }
    
    // Check if .env.example exists
    if (!fs.existsSync('.env.example')) {
      this.addWarning('env', 'Missing .env.example file for documentation');
    }
  }

  checkSecurityHeaders() {
    console.log('🔍 Checking security headers configuration...');
    
    if (fs.existsSync('next.config.js')) {
      const configContent = fs.readFileSync('next.config.js', 'utf8');
      
      const requiredHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Referrer-Policy',
        'Content-Security-Policy',
        'Strict-Transport-Security'
      ];
      
      requiredHeaders.forEach(header => {
        if (!configContent.includes(header)) {
          this.addWarning('headers', `Missing security header: ${header}`, 'next.config.js');
        }
      });
      
      if (configContent.includes('dangerouslyAllowSVG: true')) {
        this.addIssue('config', 'SVG uploads are enabled - potential XSS risk', 'next.config.js');
      }
    }
  }

  checkDependencies() {
    console.log('🔍 Checking dependencies...');
    
    if (fs.existsSync('package.json')) {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check for security-related packages
      const securityPackages = [
        'helmet',
        'express-rate-limit',
        'cors',
        'bcrypt',
        'jsonwebtoken'
      ];
      
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      securityPackages.forEach(pkg => {
        if (!allDeps[pkg] && pkg !== 'helmet') { // helmet not needed in Next.js
          this.addInfo('deps', `Consider adding security package: ${pkg}`);
        }
      });
    }
  }

  checkFilePermissions() {
    console.log('🔍 Checking file permissions...');
    
    const sensitiveFiles = [
      '.env.local',
      'next.config.js',
      'src/middleware.ts'
    ];
    
    sensitiveFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          const stats = fs.statSync(file);
          const mode = stats.mode & parseInt('777', 8);
          
          if (mode > parseInt('644', 8)) {
            this.addWarning('permissions', `File has overly permissive permissions: ${mode.toString(8)}`, file);
          }
        } catch (error) {
          this.addWarning('permissions', `Could not check permissions for ${file}`);
        }
      }
    });
  }

  checkCodePatterns() {
    console.log('🔍 Checking code patterns...');
    
    const checkFile = (filePath) => {
      if (!fs.existsSync(filePath)) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for potential security issues
      const patterns = [
        { pattern: /eval\s*\(/, message: 'Use of eval() detected - potential security risk' },
        { pattern: /innerHTML\s*=/, message: 'Use of innerHTML detected - potential XSS risk' },
        { pattern: /document\.write/, message: 'Use of document.write detected - potential XSS risk' },
        { pattern: /process\.env\.[A-Z_]+(?!\s*\|\|)/, message: 'Direct environment variable access without fallback' },
      ];
      
      patterns.forEach(({ pattern, message }) => {
        if (pattern.test(content)) {
          this.addWarning('code', message, filePath);
        }
      });
    };
    
    // Check key files
    const filesToCheck = [
      'src/middleware.ts',
      'src/lib/database.ts',
      'next.config.js'
    ];
    
    filesToCheck.forEach(checkFile);
  }

  generateReport() {
    console.log('\n📊 Security Audit Report');
    console.log('========================\n');
    
    if (this.issues.length > 0) {
      console.log('🚨 Critical Issues:');
      this.issues.forEach(issue => {
        console.log(`  - ${issue.message}${issue.file ? ` (${issue.file})` : ''}`);
      });
      console.log('');
    }
    
    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      this.warnings.forEach(warning => {
        console.log(`  - ${warning.message}${warning.file ? ` (${warning.file})` : ''}`);
      });
      console.log('');
    }
    
    if (this.info.length > 0) {
      console.log('ℹ️  Recommendations:');
      this.info.forEach(info => {
        console.log(`  - ${info.message}${info.file ? ` (${info.file})` : ''}`);
      });
      console.log('');
    }
    
    const totalIssues = this.issues.length + this.warnings.length;
    
    if (totalIssues === 0) {
      console.log('✅ No security issues found!');
    } else {
      console.log(`Found ${this.issues.length} critical issues and ${this.warnings.length} warnings.`);
    }
    
    console.log('\n📝 Next Steps:');
    console.log('1. Address all critical issues immediately');
    console.log('2. Review and fix warnings');
    console.log('3. Consider implementing recommendations');
    console.log('4. Run npm audit for dependency vulnerabilities');
    console.log('5. Set up automated security scanning in CI/CD');
  }

  run() {
    console.log('🔒 Starting Security Audit...\n');
    
    this.checkEnvironmentFiles();
    this.checkSecurityHeaders();
    this.checkDependencies();
    this.checkFilePermissions();
    this.checkCodePatterns();
    
    this.generateReport();
  }
}

// Run the audit
const auditor = new SecurityAuditor();
auditor.run();