import { getSvgContent } from '../../icon.js';
import { sbbInputModalityDetector } from '../a11y.js';
import type { SbbIconConfig } from '../config.js';
import { mergeConfig } from '../config.js';

import { isHydratedSsr, isVisualRegressionRun } from './private.js';

if (isVisualRegressionRun()) {
  const preloadedIcons = ['arrow-right-small'];
  await Promise.all(preloadedIcons.map((icon) => getSvgContent('default', icon, true)));

  mergeConfig({
    icon: {
      interceptor({ namespace, name }) {
        throw new Error(`Icon ${namespace}:${name} must be preloaded in test-setup.ts!`);
      },
    },
  });
} else {
  // Setup mock configuration for icons
  const testNamespaces = ['default', 'picto'];
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
}

if (isHydratedSsr()) {
  await import('@lit-labs/ssr-client/lit-element-hydrate-support.js');
}

function globalTestingSetup(): void {
  beforeEach(() => {
    sbbInputModalityDetector.reset();
  });

  afterEach(async () => {
    const fixtures = await import('@lit-labs/testing/fixtures.js');
    fixtures.cleanupFixtures();
  });
}

if (document.readyState === 'loading') {
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', globalTestingSetup);
} else {
  setTimeout(globalTestingSetup);
}
