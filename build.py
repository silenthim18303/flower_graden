import os
import shutil
import time

dist_dir = 'dist_build'

if os.path.exists(dist_dir):
    for _ in range(5):
        try:
            shutil.rmtree(dist_dir)
            break
        except Exception as e:
            print(f'Waiting for {dist_dir} to be released...')
            time.sleep(0.5)

os.makedirs(dist_dir, exist_ok=True)

html_files = [
    'index.html',
    'shop.html',
    'garden.html',
    'work.html',
    'compost.html',
    'compost_ola.html',
    'ecommerce.html',
    'flowerbox.html',
    'mower.html',
    'seed.html',
    'sickle.html',
    'tree.html',
    'game.html',
    'dog.html',
    'tutorial.html',
    'minesweeper.html'
]

for html_file in html_files:
    if os.path.exists(html_file):
        shutil.copy(html_file, dist_dir)
        print(f'Copied: {html_file}')

if os.path.exists('public'):
    public_items = os.listdir('public')
    for item in public_items:
        src = os.path.join('public', item)
        dst = os.path.join(dist_dir, item)
        if os.path.exists(dst):
            if os.path.isdir(dst):
                shutil.rmtree(dst)
            else:
                os.remove(dst)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy(src, dst)
        print(f'Copied: public/{item}')

if os.path.exists('src/main.js'):
    shutil.copy('src/main.js', os.path.join(dist_dir, 'main.js'))
    print(f'Copied: src/main.js -> dist/main.js')

print(f'\nBuild complete! Output in {dist_dir}/ directory')
print(f'Now you can run: http-server {dist_dir} -p 8080')
