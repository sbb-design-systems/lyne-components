import * as tokens from '@sbb-esta/lyne-design-tokens';
import type { Preview } from '@storybook/web-components-vite';
import type { Parameters, StoryContext } from 'storybook/internal/types';
import { makeDecorator } from 'storybook/preview-api';

import '../src/elements/core/styles/standard-theme.scss';

/**
 * The Lean design is applied by adding the 'sbb-lean' class to the document.
 */
const withLeanDecorator = makeDecorator({
  name: 'withLeanStyle',
  parameterName: 'isLean',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const isLean = parameters as unknown as boolean;

    if (isLean) {
      document.documentElement.classList.add('sbb-lean');
    } else {
      document.documentElement.classList.remove('sbb-lean');
    }

    return getStory(context);
  },
});

const withBackgroundDecorator = makeDecorator({
  name: 'withContextSpecificBackgroundColor',
  parameterName: 'backgroundColor',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const backgroundColor = parameters as (context: StoryContext) => string;

    const rootElement = (context.canvasElement as unknown as HTMLElement).closest<HTMLElement>(
      '.docs-story, .sb-show-main',
    )!;

    // If no background function is set, remove background color.
    if (!backgroundColor) {
      rootElement.style.removeProperty('background-color');
    } else {
      rootElement.style.backgroundColor = backgroundColor(context);
    }

    return getStory(context);
  },
});

const getViewportName = (key: string): string =>
  key.replace(/(^SbbBreakpoint|Min$)/g, '').toLowerCase();

const breakpoints = Object.entries(tokens)
  .filter(([key]) => key.startsWith('SbbBreakpoint') && key.endsWith('Min'))
  .map(([key, value]) => ({ key: getViewportName(key), value: value as number }))
  .sort((a, b) => a.value - b.value);

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

const parameters: Parameters = {
  breakpoints: {
    breakpointNames,
    debounceTimeout: 10,
  },
  tags: ['autodocs'],
  docs: {
    toc: {
      ignoreSelector: '.docs-story h2',
      headingSelector: 'h2',
    },
    source: { format: 'html' },
  },
  viewport: { options: storybookViewports },
  backgrounds: { disable: true },
  options: {
    storySort: {
      // Story section order.
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      order: ['introduction', 'pages', 'elements', 'experimental', 'styles', 'internals'],
    },
  },
};

const forwardedEvents = new WeakSet<Event>();

const openCloseEventsForwarder = (event: Event): void => {
  const root = document && document.getElementById('storybook-root');

  if (root && !forwardedEvents.has(event)) {
    const eventConstructor = Object.getPrototypeOf(event).constructor;
    const copiedEvent: Event = new eventConstructor(event.type, event);
    forwardedEvents.add(copiedEvent);
    root.dispatchEvent(copiedEvent);
  }
};

export default {
  decorators: [
    withBackgroundDecorator,
    withLeanDecorator,
    (story) => {
      const root = document && document.getElementById('storybook-root');

      if (!root) {
        return story();
      }

      for (const eventName of [
        'willOpen',
        'didOpen',
        'willClose',
        'didClose',
        'willStick',
        'didStick',
        'willUnstick',
        'didUnstick',
      ]) {
        root.removeEventListener(eventName, openCloseEventsForwarder, { capture: true });
        root.addEventListener(eventName, openCloseEventsForwarder, { capture: true });
      }

      return story();
    },
  ],
  parameters,
  tags: ['autodocs'],
} satisfies Preview;
