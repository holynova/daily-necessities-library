import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');
const thumbnailDir = path.join(assetsDir, 'thumbnails');

async function collectPngs(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (['thumbnails', 'details'].includes(entry.name) || entry.name.startsWith('.')) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectPngs(fullPath)));
    } else if (/\.png$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await collectPngs(assetsDir);
let originalBytes = 0;
let thumbnailBytes = 0;

for (const source of files) {
  const relativePath = path.relative(assetsDir, source);
  const parsed = path.parse(relativePath);
  const destinationDir = path.join(thumbnailDir, parsed.dir);
  const destination = path.join(destinationDir, `${parsed.name}.webp`);
  const sourceStats = await fs.stat(source);

  await fs.mkdir(destinationDir, { recursive: true });
  await sharp(source)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(destination);

  originalBytes += sourceStats.size;
  thumbnailBytes += (await fs.stat(destination)).size;
}

const savedPercent = originalBytes ? ((1 - thumbnailBytes / originalBytes) * 100).toFixed(1) : '0.0';
console.log(`Generated ${files.length} WebP thumbnails (${savedPercent}% smaller than source PNGs).`);
