import * as tokens from '@sbb-esta/lyne-design-tokens';
import type { Decorator } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import { html } from 'lit';
import '../src/components/core/styles/global.scss';

const getViewportName = (key: string): string =>
  key.replace(/(^SbbBreakpoint|Min$)/g, '').toLowerCase();
const breakpoints = Object.entries(tokens)
  .filter(([key]) => key.startsWith('SbbBreakpoint') && key.endsWith('Min'))
  .map(([key, value]) => ({ key: getViewportName(key), value: value as number }))
  .sort((a, b) => a.value - b.value);
/**
 * https://www.chromatic.com/docs/viewports/
 * CHROMATIC RESTRICTIONS:
 * - min allowed value = 320
 * - max allowed value = 1800
 */
const viewports = breakpoints.map(({ value }) => (value < 320 ? 320 : value > 1800 ? 1800 : value));
const breakpointNames: Record<string, number> = breakpoints.reduce(
  (current, next) => Object.assign(current, { [next.key]: next.value }),
  {} as Record<string, number>,
);
const storybookViewports = breakpoints.reduce(
  (current, next) =>
    Object.assign(current, {
      [next.key]: {
        name: `Breakpoint ${next.key}`,
        styles: {
          width: `${next.value || 320}px`,
          height: '',
        },
      },
    }),
  {} as Record<string, number>,
);

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 2000,
    viewports,
    disableSnapshot: true,
  },
  breakpoints: {
    breakpointNames,
    debounceTimeout: 10,
  },
  viewport: { viewports: storybookViewports },
  options: {
    storySort: {
      // Story section order.
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      order: [
        'pages',
        ['home', 'home personalized'],
        'components',
        ['*', 'form elements', 'cards', 'layout'],
        'styles',
        'timetable',
        'internals',
      ],
    },
  },
};

export const decorators: Decorator[] = [
  (story) => (isChromatic() ? html`<div class="sbb-disable-animation">${story()}</div>` : story()),
];
