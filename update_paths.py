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
        
        # 替换图片路径
        content = re.sub(r'src="img/', 'src="/img/', content)
        # 替换JS路径
        content = re.sub(r'src="js/', 'src="/src/js/', content)
        # 替换Phaser路径
        content = re.sub(r'src="phaser-4\.1\.0/dist/phaser\.js"', 'src="/phaserjs/phaser.js"', content)
        # 移除可能的无效标签
        content = re.sub(r'<script src="js/core/preload\.js\s+src="js/core/transition\.js"></script>', '', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filename}')
    else:
        print(f'Not found: {filename}')

print('Done!')
