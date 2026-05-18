import os
import re

html_files = [
    'compost.html',
    'ecommerce.html',
    'flowerbox.html',
    'garden.html',
    'mower.html',
    'seed.html',
    'sickle.html',
    'tree.html',
    'work.html'
]

for filename in html_files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 修复错误的script标签
        old_pattern = r'</script>\s*<script src="/src/js/core/preload\.js\s+src="/src/js/core/transition\.js"></script>\s*</script>'
        new_content = re.sub(old_pattern, '</script>', content)
        
        # 如果没匹配到，尝试另一种模式
        if new_content == content:
            old_pattern2 = r'<script src="/src/js/core/preload\.js\s+src="/src/js/core/transition\.js"></script>\s*</script>'
            new_content = re.sub(old_pattern2, '</script>', content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed: {filename}')
        else:
            print(f'No fix needed: {filename}')
    else:
        print(f'Not found: {filename}')

print('Done!')
