import { sbbInputModalityDetector } from '../a11y';
import type { SbbIconConfig } from '../config';
import { mergeConfig } from '../config';

import { isHydratedSsr } from './platform';

function setupIconConfig(): void {
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

setupIconConfig();

if (isHydratedSsr()) {
  await import('@lit-labs/ssr-client/lit-element-hydrate-support.js');
}

beforeEach(() => {
  sbbInputModalityDetector.reset();
});

afterEach(async () => {
  const fixtures = await import('@lit-labs/testing/fixtures.js');
  fixtures.cleanupFixtures();
});
