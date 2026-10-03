import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const assetsDir = path.resolve('public/assets');
const destinationDir = path.join(assetsDir, 'details');
const manifestPath = path.join(destinationDir, 'manifest.json');
const settings = { width: 1400, quality: 85, effort: 4 };
let previous = {};
try {
  previous = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
} catch {
  /* First generation. */
}
async function collect(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (
      ['thumbnails', 'details'].includes(entry.name) ||
      entry.name.startsWith('.')
    )
      continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(file)));
    else if (/\.png$/i.test(entry.name)) files.push(file);
  }
  return files;
}
const manifest = {};
let generated = 0;
let originalBytes = 0;
let detailBytes = 0;
for (const source of await collect(assetsDir)) {
  const relative = path.relative(assetsDir, source);
  const bytes = await fs.readFile(source);
  const signature = crypto
    .createHash('sha256')
    .update(bytes)
    .update(JSON.stringify(settings))
    .digest('hex');
  const destination = path.join(
    destinationDir,
    relative.replace(/\.png$/i, '.webp'),
  );
  let exists = false;
  try {
    exists = (await fs.stat(destination)).size > 0;
  } catch {
    /* New file. */
  }
  if (previous[relative] !== signature || !exists) {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await sharp(bytes)
      .resize({ width: settings.width, withoutEnlargement: true })
      .webp({ quality: settings.quality, effort: settings.effort })
      .toFile(destination);
    generated++;
  }
  manifest[relative] = signature;
  originalBytes += bytes.length;
  detailBytes += (await fs.stat(destination)).size;
}
await fs.mkdir(destinationDir, { recursive: true });
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(
  JSON.stringify({
    files: Object.keys(manifest).length,
    generated,
    originalBytes,
    detailBytes,
  }),
);
