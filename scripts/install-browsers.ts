import { spawn } from 'node:child_process';

if (!process['CI']) {
  const binary = process.env['npm_execpath'] || 'npx';
  spawn(binary, ['playwright', 'install'], { stdio: 'inherit' });
} else {
  console.log('Running in CI environment, skipping browser installation.');
}
