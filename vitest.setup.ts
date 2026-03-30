// import { cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { beforeEach } from 'vitest';

import { sbbInputModalityDetector } from './src/elements/core/a11y.ts';
import { mergeConfig, type SbbIconConfig } from './src/elements/core/config.ts';
// Import global styles (standard theme + experimental)
// These files are excluded from postcssLit in the vite config, so they remain as plain CSS.
import standardTheme from './src/elements/core/styles/standard-theme.scss?inline';
import experimentalTheme from './src/elements-experimental/core/styles/standard-theme.scss?inline';

// Inject styles into the document
const styleEl = document.createElement('style');
styleEl.textContent = standardTheme + '\n' + experimentalTheme;
document.head.appendChild(styleEl);

// Setup mock configuration for icons (equivalent to WTR test-setup)
const testNamespaces = ['default', 'picto'];

beforeEach(() => {
  sbbInputModalityDetector.reset();
  (globalThis as { disableAnimation?: boolean }).disableAnimation = true;
});

// globalThis.testEnv = '${cliArgs.debug ? 'debug' : ''}';
// globalThis.testGroup = '${cliArgs['visual-regression'] ? 'visual-regression' : 'default'}';
// (globalThis as { disableAnimation?: boolean }).disableAnimation = true;

// afterEach(() => {cleanup()})

const icon: SbbIconConfig = {
  interceptor: ({ namespace, name, request }) => {
    if (testNamespaces.includes(namespace)) {
      const dimension = name.endsWith('-large') ? 48 : name.endsWith('-medium') ? 36 : 24;
      return Promise.resolve(
        `<svg-fake
          data-name="${name}"
          height="${dimension}"
          style="width:${dimension}px;height:${dimension}px"
          width="${dimension}"
        >
        </svg-fake>`,
      );
    }
    return request();
  },
};
mergeConfig({ icon });

// TODO: Preload icons (we're in the browser here)
// const preloadedIcons = await preloadIcons();
// const iconContainer = document.querySelector('#icons-preload')!;
// iconContainer.innerHTML = preloadedIcons.map((i) => `<template id="icon:${i.namespace}:${i.icon}">${i.svg}</template>`).join('');

if (typeof Temporal !== 'object') {
  await import('temporal-polyfill/global');
}
