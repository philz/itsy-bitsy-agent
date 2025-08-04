import { context } from 'esbuild';
import { readFileSync, writeFileSync, watch } from 'fs';
import { createHash } from 'crypto';

function updateHtml() {
  try {
    // Generate hash for cache busting (simplified for dev)
    const hash = createHash('sha256').update(Date.now().toString()).digest('hex').substring(0, 8);
    const buildTime = new Date().toISOString();

    // Update the landing page with build timestamp and hash
    const htmlTemplate = readFileSync('src/index.html', 'utf8');
    const updatedHtml = htmlTemplate
      .replace(/{{BUILD_TIME}}/g, buildTime)
      .replace(/{{CACHE_HASH}}/g, hash);

    writeFileSync('dist/index.html', updatedHtml);
    console.log(`HTML updated at ${buildTime} with hash ${hash}`);
  } catch (error) {
    console.error('Error updating HTML:', error);
  }
}

// Initial HTML build
updateHtml();

// Watch for HTML changes
watch('src/index.html', (eventType) => {
  if (eventType === 'change') {
    console.log('HTML file changed, updating...');
    updateHtml();
  }
});

// Start esbuild in watch mode
const ctx = await context({
  entryPoints: ['src/agent.ts'],
  bundle: true,
  outfile: 'dist/agent.js',
  format: 'iife',
  sourcemap: true,
});

await ctx.watch();
console.log('Watching for changes...');