import {describe,expect,it} from 'vitest';
import catalog from '../content/catalog.json';
import manifest from '../src/data/manifest.json';
import inventory from '../content/source-inventory.json';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
describe('material catalogue completeness',()=>{
 it('includes each unique source material exactly once',()=>{
  expect(catalog.records).toHaveLength(137);
  expect(catalog.records.filter(r=>r.kind==='single')).toHaveLength(116);
  expect(catalog.records.filter(r=>r.kind==='scene')).toHaveLength(21);
  expect(new Set(catalog.records.map(r=>r.sourcePath)).size).toBe(137);
  expect(new Set(manifest.images.map(r=>r.slug))).toEqual(new Set(catalog.records.map(r=>r.slug)));
  expect(inventory.images).toHaveLength(426);
  expect(new Set(inventory.images.map(r=>r.sha)).size).toBe(289);
 });
 it('keeps PNG dimensions and alpha while stripping metadata from downloads',async()=>{
  for(const image of manifest.images){
   const download=await sharp(path.join('public',image.download!.src)).metadata();
   const original=await sharp(path.join('incoming',image.source)).metadata();
   expect(download.format).toBe('png');
   expect([download.width,download.height,download.hasAlpha]).toEqual([original.width,original.height,original.hasAlpha]);
   expect(download.exif).toBeUndefined();
   expect(download.icc).toBeUndefined();
   expect((await fs.stat(path.join('public',image.download!.src))).size).toBe(image.download!.bytes);
  }
 });
});
