import {
  SbbBreakpointLargeMin,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
  SbbBreakpointZeroMin,
} from '@sbb-esta/lyne-design-tokens';
import type { Preview } from '@storybook/web-components-vite';
import type { Parameters, StoryContext } from 'storybook/internal/types';
import { makeDecorator } from 'storybook/preview-api';

import '../src/elements/core/styles/standard-theme.scss';

import leanTheme from '../src/elements/core/styles/lean-theme.scss?inline';
import offBrandTheme from '../src/elements/core/styles/off-brand-theme.scss?inline';
import safetyTheme from '../src/elements/core/styles/safety-theme.scss?inline';

const originalStyleSheet = Array.from(document.styleSheets).find((stylesheet) =>
  Array.from(stylesheet.cssRules).find((value) =>
    // We assume that we target the standard theme file if this variable is included.
    value.cssText.includes('--sbb-font-color-default'),
  ),
);

const standardTheme = Array.from(originalStyleSheet?.cssRules ?? [])
  .map((rule) => rule.cssText)
  .join('');

// We need a created stylesheet to manipulate it.
// So we copy the content of the preloaded standard
// theme into the constructed one then we remove the original one.
const themeStyleSheet = new CSSStyleSheet();
themeStyleSheet.replaceSync(standardTheme);
document.adoptedStyleSheets.push(themeStyleSheet);
originalStyleSheet?.ownerNode?.remove();

const themeMap = {
  standard: standardTheme,
  'off-brand': offBrandTheme,
  safety: safetyTheme,
  lean: leanTheme,
};

const themeDecorator = makeDecorator({
  name: 'theme',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const selectedTheme = context.globals.theme as 'standard' | 'off-brand' | 'safety' | 'lean';

    themeStyleSheet?.replaceSync(themeMap[selectedTheme]);

    return getStory(context);
  },
});

/**
 * The Lean design is applied by adding the 'sbb-lean' class to the document.
 * @deprecated
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

    document.documentElement.classList.remove('sbb-dark', 'sbb-light');

    if (selectedMode === 'light') {
      document.documentElement.classList.add('sbb-light');
    } else if (selectedMode === 'dark') {
      document.documentElement.classList.add('sbb-dark');
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

const breakpoints = Object.entries({
  zero: { width: SbbBreakpointZeroMin, height: '640px' },
  small: { width: SbbBreakpointSmallMin, height: '800px' },
  large: { width: SbbBreakpointLargeMin, height: '768px' },
  ultra: { width: SbbBreakpointUltraMin, height: '900px' },
})
  .map(([key, value]) => ({
    key: key,
    value: { width: parseFloat(value.width) * 16, height: value.height },
  }))
  .sort((a, b) => a.value.width - b.value.width);

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
          width: `${next.value.width || 360}px`,
          height: next.value.height,
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
      order: ['introduction', 'guides', 'pages', 'elements', 'experimental', 'styles', 'internals'],
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

const isDev = (): boolean => window.location.hostname === 'localhost';

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
          { value: 'auto', title: 'light dark mode', icon: 'mirror' },
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
        title: 'Theme',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { value: 'standard', title: 'standard', icon: 'photo' },
          { value: 'off-brand', title: 'off-brand', icon: 'paintbrush' },
          { value: 'safety', title: 'safety', icon: 'alert' },
          ...(isDev() ? [{ value: 'lean', title: 'lean', icon: 'grow' as const }] : []),
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
