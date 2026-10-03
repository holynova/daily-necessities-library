import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const dimensions = {};
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (
      entry.name.startsWith('.') ||
      ['details', 'thumbnails'].includes(entry.name)
    )
      continue;
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(source);
    else if (/\.png$/i.test(entry.name)) {
      const { width, height } = await sharp(source).metadata();
      dimensions['/' + source.replace(/^public\//, '')] = { width, height };
    }
  }
}
await scan('public/assets');
await fs.writeFile(
  'app/image-dimensions.json',
  JSON.stringify(dimensions, null, 2) + '\n',
);
console.log(
  `Recorded ${Object.keys(dimensions).length} intrinsic image dimensions`,
);
