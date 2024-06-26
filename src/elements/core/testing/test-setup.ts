// IMPORTANT: This file must not have imports to components and/or lit.
// This would import the LitElement class without hydration, which would break SSR tests.

import { cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import type { UncompiledTemplateResult } from 'lit';
import type { MochaOptions } from 'mocha';

import { mergeConfig, type SbbIconConfig } from '../config.js';

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
    (await import('../a11y/input-modality-detector.js')).sbbInputModalityDetector.reset();
  },
  afterEach: () => {
    cleanupFixtures();
  },
};

// TODO: Decide if we want to remove hydration logic in non ssr scenario.
//if (testGroup === 'ssr') {}

if (testGroup === 'visual-regression') {
  const preloadedIcons = [
    'add-stop',
    'alternative',
    'app-icon-medium',
    'app-icon-small',
    'arrow-long-right-small',
    'arrow-right-small',
    'arrows-circle-small',
    'arrows-right-left-small',
    'arrows-long-right-left-small',
    'backpack-medium',
    'battery-level-empty-small',
    'battery-level-high-small',
    'bicycle-medium',
    'calendar-small',
    'cancellation',
    'chevron-small-down-medium',
    'chevron-small-down-small',
    'chevron-small-left-small',
    'chevron-small-right-small',
    'chevron-small-up-small',
    'circle-cross-small',
    'circle-information-large',
    'circle-information-medium',
    'circle-information-small',
    'circle-minus-small',
    'circle-plus-medium',
    'circle-plus-small',
    'circle-tick-small',
    'clock-small',
    'coins-small',
    'construction',
    'container-small',
    'context-menu-small',
    'cross-small',
    'delay',
    'diamond-small',
    'disruption',
    'dog-medium',
    'dog-small',
    'exclamation-point-small',
    'exit-small',
    'eye-small',
    'face-smiling-small',
    'folder-open-medium',
    'folder-open-small',
    'globe-small',
    'hamburger-menu-small',
    'heart-medium',
    'house-small',
    'info',
    'link-small',
    'location-pin-map-small',
    'magnifying-glass-small',
    'minus-small',
    'missed-connection',
    'pen-medium',
    'pen-small',
    'pie-medium',
    'pie-small',
    'platform-change',
    'plus-medium',
    'plus-small',
    'qrcode-small',
    'replacementbus',
    'reroute',
    'sa-abteilkinderwagen',
    'sa-b',
    'sa-bz',
    'sa-ci',
    'sa-fz',
    'sa-nf',
    'sa-r',
    'sa-rr',
    'sa-rs',
    'sa-wr',
    'shopping-cart-small',
    'swisspass-medium',
    'swisspass-small',
    'tick-small',
    'ticket-route-medium',
    'tickets-class-small',
    'train-medium',
    'train-small',
    'trash-small',
    'travel-backpack-medium',
    'user-small',
    'utilization-high',
    'utilization-low',
    'utilization-medium',
    'utilization-none',
    'walk-fast-small',
    'walk-slow-small',
    'walk-small',
  ];
  const { getSvgContent } = await import('../../icon/icon-request.js');
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

// We import and run the web test runner script manually, as it ensures correct load order.
await import(/* @vite-ignore */ testRunScript);
