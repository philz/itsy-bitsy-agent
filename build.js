import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';

// Build the TypeScript agent
await build({
  entryPoints: ['src/agent.ts'],
  bundle: true,
  outfile: 'dist/agent.js',
  format: 'iife',
  minify: true
});

// Generate hash for cache busting
const agentCode = readFileSync('dist/agent.js', 'utf8');
const hash = createHash('sha256').update(agentCode).digest('hex').substring(0, 8);
const buildTime = new Date().toISOString();

// Update the landing page with build timestamp and hash
const htmlTemplate = readFileSync('src/index.html', 'utf8');
const updatedHtml = htmlTemplate
  .replace(/{{BUILD_TIME}}/g, buildTime)
  .replace(/{{CACHE_HASH}}/g, hash);

writeFileSync('dist/index.html', updatedHtml);

console.log(`Build completed at ${buildTime} with hash ${hash}`);