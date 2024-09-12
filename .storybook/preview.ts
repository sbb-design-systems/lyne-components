import * as tokens from '@sbb-esta/lyne-design-tokens';
import { makeDecorator } from '@storybook/preview-api';
import type { Parameters, StoryContext } from '@storybook/types';
import type { Preview } from '@storybook/web-components';

import '../src/elements/core/styles/standard-theme.scss';

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

const withDirectionDecorator = makeDecorator({
  name: 'withDirection',
  parameterName: 'direction',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const direction = context.globals.direction as string;
    const directionFactory = parameters as (context: StoryContext) => string;

    const rootElement = (context.canvasElement as unknown as HTMLElement).closest('html')!;

    // If no background function is set, remove background color.
    if (!direction && !directionFactory) {
      rootElement.removeAttribute('dir');
    } else {
      rootElement.setAttribute('dir', directionFactory?.(context) ?? direction);
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
  viewport: { viewports: storybookViewports },
  backgrounds: { disable: true },
  options: {
    storySort: {
      // Story section order.
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      order: ['introduction', 'pages', 'elements', 'experimental', 'styles', 'internals'],
    },
  },
};

const preview: Preview = {
  decorators: [withBackgroundDecorator, withDirectionDecorator],
  parameters,
  tags: ['autodocs'],
  globalTypes: {
    direction: {
      description: 'Change direction',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'transfer',
        items: ['ltr', 'rtl'],
      },
    },
  },
};

export default preview;
