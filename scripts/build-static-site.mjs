import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentDir = resolve(rootDir, 'ieumedu.or.kr/components');
const distDir = resolve(rootDir, 'ieumedu.or.kr/components-dist');
const vendorDir = resolve(rootDir, 'ieumedu.or.kr/vendor');

const buildTargets = [
  ['nav.jsx', 'nav.js'],
  ['pages.jsx', 'pages.js'],
  ['about-pages.jsx', 'about-pages.js'],
  ['courses-page.jsx', 'courses-page.js'],
  ['faculty-page.jsx', 'faculty-page.js'],
  ['location-page.jsx', 'location-page.js'],
  ['notice-page.jsx', 'notice-page.js'],
  ['app.jsx', 'app.js'],
];

const vendorTargets = [
  ['react/umd/react.production.min.js', 'react.production.min.js'],
  ['react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
];

mkdirSync(distDir, { recursive: true });
mkdirSync(vendorDir, { recursive: true });

for (const [sourceName, outputName] of buildTargets) {
  execFileSync(
    'npx',
    [
      '--yes',
      'esbuild',
      resolve(componentDir, sourceName),
      '--loader:.jsx=jsx',
      '--jsx-factory=React.createElement',
      '--jsx-fragment=React.Fragment',
      '--target=es2019',
      `--outfile=${resolve(distDir, outputName)}`,
    ],
    {
      cwd: rootDir,
      stdio: 'inherit',
    },
  );
}

for (const [packagePath, outputName] of vendorTargets) {
  const sourcePath = resolvePackageFile(packagePath);
  copyFileSync(sourcePath, resolve(vendorDir, outputName));
}

function resolvePackageFile(packagePath) {
  const candidatePaths = [
    resolve(rootDir, 'node_modules', packagePath),
    resolve(process.env.HOME || '', 'node_modules', packagePath),
  ];
  const match = candidatePaths.find((candidate) => existsSync(candidate));
  if (!match) {
    throw new Error(`Cannot find dependency asset: ${packagePath}`);
  }
  return match;
}
