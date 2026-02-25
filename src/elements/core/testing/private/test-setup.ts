// IMPORTANT: This file must not have imports to components and/or lit.
// This would import the LitElement class without hydration, which would break SSR tests.

import { cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import type { UncompiledTemplateResult } from 'lit';
import type { MochaOptions } from 'mocha';

import { mergeConfig, type SbbIconConfig } from '../../config.ts';

const {
  __WTR_CONFIG__: { testFrameworkConfig },
  testGroup,
  testRunScript,
} = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __WTR_CONFIG__: { testFrameworkConfig: MochaOptions };
  testGroup: string;
  testRunScript: string;
};

testFrameworkConfig.rootHooks = {
  beforeEach: async () => {
    (await import('../../a11y/input-modality-detector.ts')).sbbInputModalityDetector.reset();
    (globalThis as { disableAnimation?: boolean }).disableAnimation = true;
  },
  afterEach: () => {
    cleanupFixtures();
  },
};

if (testGroup === 'visual-regression') {
  mergeConfig({
    icon: {
      async interceptor({ namespace, name }) {
        const template = document.getElementById(`icon:${namespace}:${name}`);
        if (!template) {
          throw new Error(
            `Icon ${namespace}:${name} must be preloaded in tools/web-test-runner/preload-icons.ts!`,
          );
        }

        return template.innerHTML;
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

// A simple functionality to try to render a TemplateResult for debugging purposes.
(globalThis as any).fakeRender = function fakeRender(node: UncompiledTemplateResult): string {
  let result = '';
  node.strings.forEach((e, i) => {
    result += e;
    const value = node.values[i];
    if (typeof value === 'string') {
      result += value;
    } else if (typeof value === 'boolean') {
      result += value.toString();
    } else if (typeof value === 'symbol' && value.description === 'lit-nothing') {
      // Do nothing
    } else if (typeof value === 'object' && (value as UncompiledTemplateResult)?.strings) {
      result += fakeRender(value as UncompiledTemplateResult);
    } else {
      // Placeholder for unknown values.
      result += 'Δ';
    }
  });
  return result;
};

if (typeof Temporal !== 'object') {
  await import('temporal-polyfill/global');
}

// We import and run the web test runner script manually, as it ensures correct load order.
await import(/* @vite-ignore */ testRunScript);
