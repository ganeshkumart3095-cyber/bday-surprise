import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const secretDir = path.join(distDir, 'secret');

if (fs.existsSync(distDir)) {
  fs.mkdirSync(secretDir, { recursive: true });
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(secretDir, 'index.html'));
  console.log('Created dist/secret/index.html for direct SPA 200 OK routing on GitHub Pages.');
}
