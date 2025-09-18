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

const lightDarkModeDecorator = makeDecorator({
  name: 'lightOrDarkMode',
  parameterName: 'darkMode',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const selectedMode = context.globals.mode as 'light' | 'dark' | 'auto';

    document.documentElement.classList.remove('sbb-dark', 'sbb-light', 'sbb-light-dark');

    if (selectedMode === 'light') {
      document.documentElement.classList.add('sbb-light');
    } else if (selectedMode === 'dark') {
      document.documentElement.classList.add('sbb-dark');
    } else {
      document.documentElement.classList.add('sbb-light-dark');
    }

    return getStory(context);
  },
});

const styleElementMap: Record<string, HTMLLinkElement | HTMLStyleElement | null> = {
  standard: null,
  'off-brand': null,
  safety: null,
};

const themeDecorator = makeDecorator({
  name: 'theme',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const selectedTheme = context.globals.theme as 'standard' | 'off-brand' | 'safety';

    function findStyleElement(key: string): HTMLLinkElement | HTMLStyleElement | null {
      return (
        document.querySelector<HTMLLinkElement>(`link[rel=stylesheet][href*="${key}-"]`) ??
        document.querySelector<HTMLStyleElement>(`style[data-vite-dev-id*="${key}-"]`) ??
        null
      );
    }

    if (!styleElementMap[selectedTheme]) {
      import(`../src/elements/core/styles/${selectedTheme}-theme.scss`).then(() => {
        styleElementMap[selectedTheme] = findStyleElement(selectedTheme);
      });
    } else {
      Object.values(styleElementMap).forEach((entry) => entry?.remove());
      document.head.appendChild(styleElementMap[selectedTheme]);
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
    lightDarkModeDecorator,
    themeDecorator,
    (story) => {
      const root = document && document.getElementById('storybook-root');

      if (!root) {
        return story();
      }

      for (const eventName of [
        'beforeopen',
        'open',
        'beforeclose',
        'close',
        'beforestick',
        'stick',
        'beforeunstick',
        'unstick',
      ]) {
        root.removeEventListener(eventName, openCloseEventsForwarder, { capture: true });
        root.addEventListener(eventName, openCloseEventsForwarder, { capture: true });
      }

      return story();
    },
  ],
  globalTypes: {
    mode: {
      description: 'Light or dark mode',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Mode',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { value: 'auto', title: 'light dark mode', icon: 'paintbrush' },
          { value: 'light', title: 'light mode', icon: 'sun' },
          { value: 'dark', title: 'dark mode', icon: 'moon' },
        ],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Themes',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Mode',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { value: 'standard', title: 'standard', icon: 'paintbrush' },
          { value: 'off-brand', title: 'off-brand', icon: 'sun' },
          { value: 'safety', title: 'safety', icon: 'moon' },
        ],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: 'auto',
    theme: 'standard',
  },
  parameters,
  tags: ['autodocs'],
} satisfies Preview;
