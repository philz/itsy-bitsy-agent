import { context } from "esbuild";
import { readFileSync, writeFileSync, watch } from "fs";
import { createHash } from "crypto";
import { execSync } from "child_process";

function buildTailwind() {
  try {
    execSync("npx tailwindcss -i ./src/styles.css -o ./dist/styles.css", {
      stdio: "inherit",
    });
    console.log("Tailwind CSS built successfully");
  } catch (error) {
    console.error("Failed to build Tailwind CSS:", error);
  }
}

function copyCustomCSS() {
  try {
    const customCss = readFileSync("src/custom.css", "utf8");
    writeFileSync("dist/custom.css", customCss);
    console.log("Custom CSS copied successfully");
  } catch (error) {
    console.error("Failed to copy custom CSS:", error);
  }
}

function updateHtml() {
  try {
    // Generate hash for cache busting (simplified for dev)
    const hash = createHash("sha256")
      .update(Date.now().toString())
      .digest("hex")
      .substring(0, 8);
    const buildTime = new Date().toISOString();

    // Update the landing page with build timestamp and hash
    const htmlTemplate = readFileSync("src/index.html", "utf8");
    const updatedHtml = htmlTemplate
      .replace(/{{BUILD_TIME}}/g, buildTime)
      .replace(/{{CACHE_HASH}}/g, hash);

    writeFileSync("dist/index.html", updatedHtml);
    console.log(`HTML updated at ${buildTime} with hash ${hash}`);
  } catch (error) {
    console.error("Error updating HTML:", error);
  }
}

// Initial builds
buildTailwind();
copyCustomCSS();
updateHtml();

// Watch for HTML changes
watch("src/index.html", (eventType) => {
  if (eventType === "change") {
    console.log("HTML file changed, updating...");
    updateHtml();
  }
});

// Watch for Tailwind CSS changes
watch("src/styles.css", (eventType) => {
  if (eventType === "change") {
    console.log("Tailwind CSS file changed, rebuilding...");
    buildTailwind();
  }
});

// Watch for custom CSS changes
watch("src/custom.css", (eventType) => {
  if (eventType === "change") {
    console.log("Custom CSS file changed, copying...");
    copyCustomCSS();
  }
});

// Start esbuild in watch mode
const ctx = await context({
  entryPoints: ["src/agent.ts"],
  bundle: true,
  outfile: "dist/agent.js",
  format: "iife",
  sourcemap: true,
});

await ctx.watch();
console.log("Watching for changes...");
