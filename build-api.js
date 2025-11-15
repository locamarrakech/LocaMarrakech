import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const execPromise = promisify(exec);

async function buildAPI() {
  try {
    // Create dist directory if it doesn't exist
    const distDir = resolve(process.cwd(), 'dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    // Build TypeScript files
    console.log('Building API files...');
    await execPromise('npx tsc --outDir dist/pages/api --allowJs --declaration false --emitDeclarationOnly false pages/api/*.ts');
    console.log('API files built successfully!');
  } catch (error) {
    console.error('Error building API files:', error);
    process.exit(1);
  }
}

buildAPI();