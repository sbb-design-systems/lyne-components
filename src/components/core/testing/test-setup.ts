import { sbbInputModalityDetector } from '../a11y';
import type { SbbIconConfig } from '../config';
import { mergeConfig } from '../config';

import { isHydratedSsr } from './platform';

function setupIconConfig(): void {
  const icon: SbbIconConfig = {
    interceptor: ({ namespace, name, request }) => {
      if (namespace === 'default' || namespace === 'picto') {
        const dimension = name.endsWith('-large') ? 48 : name.endsWith('-medium') ? 36 : 24;
        return Promise.resolve(
          `<svg-fake data-name='${name}' width='${dimension}' height='${dimension}' style="width:${dimension}px;height:${dimension}px"></svg-fake>`,
        );
      }
      return request();
    },
  };

  mergeConfig({
    icon,
  });
}

if (isHydratedSsr()) {
  await import('@lit-labs/ssr-client/lit-element-hydrate-support.js');
}

beforeEach(() => {
  setupIconConfig();

  sbbInputModalityDetector.reset();
});

afterEach(async () => {
  const fixtures = await import('@lit-labs/testing/fixtures.js');
  fixtures.cleanupFixtures();
});
