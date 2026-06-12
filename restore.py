import json
import os
import ast

data = json.load(open('history.json'))

for item in data:
    target_file = item['args'].get('TargetFile', '')
    if 'ActionItem.jsx' in target_file:
        if 'CodeContent' in item['args']:
            content = item['args']['CodeContent']
            if content.startswith('"') and content.endswith('"'):
                content = ast.literal_eval(content)
            with open(target_file.strip('"'), 'w', encoding='utf-8') as f:
                f.write(content)
    if 'Banner.jsx' in target_file:
        if 'ReplacementChunks' in item['args']:
            chunks_str = item['args']['ReplacementChunks']
            if chunks_str.startswith('"') and chunks_str.endswith('"'):
                chunks_str = ast.literal_eval(chunks_str)
            chunks = json.loads(chunks_str)
            # Just grab the last known state of Banner.jsx manually or apply chunks...
            pass
