import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { createHash } from 'crypto';
import { execSync } from 'child_process';
import { join, dirname } from 'path';

// Build the TypeScript agent
await build({
  entryPoints: ['src/agent.ts'],
  bundle: true,
  outfile: 'dist/agent.js',
  format: 'iife',
  minify: true
});

// Build the mutable page agent with agent component
await build({
  entryPoints: ['src/mutable-agent.ts'],
  bundle: true,
  outfile: 'dist/mutable-agent.js',
  format: 'esm',
  minify: true
});

// Build the mutable speech page agent
await build({
  entryPoints: ['src/mutable-speech-agent.ts'],
  bundle: true,
  outfile: 'dist/mutable-speech-agent.js',
  format: 'esm',
  minify: true
});

// Build Tailwind CSS (after JS is built so it can scan the built files)
try {
  execSync('npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --minify', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to build Tailwind CSS:', error);
  process.exit(1);
}

// Copy custom CSS
try {
  const customCss = readFileSync('src/custom.css', 'utf8');
  writeFileSync('dist/custom.css', customCss);
} catch (error) {
  console.error('Failed to copy custom CSS:', error);
  process.exit(1);
}

// Generate hash for cache busting
const agentCode = readFileSync('dist/agent.js', 'utf8');
const hash = createHash('sha256').update(agentCode).digest('hex').substring(0, 8);
const buildTime = new Date().toISOString();

// Copy navigation index as main page
const navIndex = readFileSync('src/nav-index.html', 'utf8');
writeFileSync('dist/index.html', navIndex);

// Copy the original bookmarklet page as agent.html
const originalTemplate = readFileSync('src/index.html', 'utf8');
const updatedOriginal = originalTemplate
  .replace(/{{BUILD_TIME}}/g, buildTime)
  .replace(/{{CACHE_HASH}}/g, hash);
writeFileSync('dist/agent.html', updatedOriginal);

// Copy the mutable page
const mutableHtml = readFileSync('src/mutable.html', 'utf8');
writeFileSync('dist/mutable.html', mutableHtml);

// Copy the mutable speech page
const mutableSpeechHtml = readFileSync('src/mutable-speech.html', 'utf8');
writeFileSync('dist/mutable-speech.html', mutableSpeechHtml);

// Copy the speech-recognition app
try {
  // Create the speech-recognition directory in dist
  mkdirSync('dist/speech-recognition', { recursive: true });
  
  // Copy all files from src/speech-recognition to dist/speech-recognition
  copyFileSync('src/speech-recognition/index.html', 'dist/speech-recognition/index.html');
  copyFileSync('src/speech-recognition/script.js', 'dist/speech-recognition/script.js');
  copyFileSync('src/speech-recognition/style.css', 'dist/speech-recognition/style.css');
  
  console.log('Speech recognition app copied successfully');
} catch (error) {
  console.error('Failed to copy speech recognition app:', error);
  process.exit(1);
}

console.log(`Build completed at ${buildTime} with hash ${hash}`);