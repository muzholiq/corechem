#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1] / "site" / "hanbit-materials"

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]; self.scripts=[]; self.styles=[]
    def handle_starttag(self, tag, attrs):
        values=dict(attrs)
        if "id" in values: self.ids.append(values["id"])
        if tag=="a" and values.get("href","").startswith("#"): self.refs.append(values["href"][1:])
        if tag=="script" and values.get("src"): self.scripts.append(values["src"])
        if tag=="link" and values.get("rel")=="stylesheet": self.styles.append(values.get("href",""))

def main():
    errors=[]; html=(ROOT/"index.html").read_text(encoding="utf-8"); parser=Parser(); parser.feed(html)
    duplicates=sorted({item for item in parser.ids if parser.ids.count(item)>1})
    if duplicates: errors.append(f"duplicate ids: {duplicates}")
    missing=sorted({ref for ref in parser.refs if ref and ref not in parser.ids})
    if missing: errors.append(f"missing anchor targets: {missing}")
    for relative in parser.scripts+parser.styles:
        if not (ROOT/relative).is_file(): errors.append(f"missing asset: {relative}")
    required=["data/site-data.js","data/materials.js","data/flows.js","data/translations.js","assets/js/app.js","assets/css/site.css"]
    for relative in required:
        if not (ROOT/relative).is_file(): errors.append(f"missing required file: {relative}")
    translations=(ROOT/"data"/"translations.js").read_text(encoding="utf-8")
    app=(ROOT/"assets"/"js"/"app.js").read_text(encoding="utf-8")
    keys=set(re.findall(r'data-i18n="([^"]+)"',html)) | set(re.findall(r"\bt\('([^']+)'\)",app))
    for key in sorted(keys):
        if len(re.findall(rf'\b{re.escape(key)}\s*:',translations))<3: errors.append(f"translation key incomplete: {key}")
    if errors:
        for error in errors: print(f"FAIL: {error}")
        return 1
    print(f"PASS: {len(parser.ids)} unique ids, {len(keys)} translated UI keys, all local assets present")
    return 0

if __name__=="__main__": sys.exit(main())
