import os
import re

html_files = [
    'compost.html',
    'ecommerce.html',
    'flowerbox.html',
    'garden.html',
    'index.html',
    'mower.html',
    'seed.html',
    'sickle.html',
    'tree.html',
    'work.html',
    'shop.html'
]

for filename in html_files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'src="/phaserjs/', 'src="./phaserjs/', content)
        content = re.sub(r'src="/src/js/', 'src="./js/', content)
        content = re.sub(r'src="/img/', 'src="./img/', content)
        content = re.sub(r'href="', 'href="./', content)
        content = re.sub(r'href="./http', 'href="http', content)
        content = re.sub(r'href="./javascript', 'href="javascript', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filename}')
    else:
        print(f'Not found: {filename}')

print('Done!')
