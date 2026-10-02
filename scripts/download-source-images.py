#!/usr/bin/env python3
"""Recreate the complete, deduplicated source archive from the pinned inventory."""
import argparse, pathlib, json, urllib.request, hashlib, concurrent.futures
root=pathlib.Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--output',required=True);args=parser.parse_args()
out=pathlib.Path(args.output).resolve();out.mkdir(parents=True,exist_ok=True)
data=json.loads((root/'content/source-inventory.json').read_text());unique={}
for entry in data['images']:unique.setdefault(entry['sha'],entry)
def download(entry):
 relative=pathlib.PurePosixPath(entry['organizedPath'])
 if relative.is_absolute() or '..' in relative.parts:raise ValueError('unsafe archive path')
 target=out.joinpath(*relative.parts)
 def digest(raw):return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
 if target.exists() and digest(target.read_bytes())==entry['sha']:return
 url='https://raw.githubusercontent.com/holynova/daily-necessities-library/'+data['commit']+'/'+urllib.parse.quote(entry['sourcePath'])
 with urllib.request.urlopen(url,timeout=90) as response:raw=response.read()
 if digest(raw)!=entry['sha']:raise ValueError('SHA mismatch: '+entry['sourcePath'])
 target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(raw)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for count,_ in enumerate(pool.map(download,unique.values()),1):
  if count%25==0:print(f'{count}/{len(unique)}',flush=True)
(out/'inventory.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(f"已整理 {len(unique)} 个独立图片；清单覆盖 {len(data['images'])} 个原路径。")
