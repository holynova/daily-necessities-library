import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceDirectory = resolve(projectRoot, 'docs');
const outputDirectory = resolve(projectRoot, 'dist');

const requiredFiles = ['index.html', 'app.js', 'site.css', 'assets/category-still-life/01-laundry-care-still-life.png'];
const missingFiles = requiredFiles.filter((relativePath) => !existsSync(resolve(sourceDirectory, relativePath)));

if (missingFiles.length > 0) {
  throw new Error(`Static Pages artifact is incomplete; missing: ${missingFiles.join(', ')}`);
}

const indexHtml = readFileSync(resolve(sourceDirectory, 'index.html'), 'utf8');
for (const assetReference of ['./site.css', './app.js', './assets/']) {
  if (!indexHtml.includes(assetReference)) {
    throw new Error(`Static Pages artifact does not reference expected asset path: ${assetReference}`);
  }
}

rmSync(outputDirectory, { recursive: true, force: true });
cpSync(sourceDirectory, outputDirectory, { recursive: true });

console.log(`Copied verified GitHub Pages artifact: ${sourceDirectory} -> ${outputDirectory}`);
