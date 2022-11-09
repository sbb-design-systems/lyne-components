import TokensRaw from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens-raw.json';
import { defineCustomElements } from '../dist/esm/loader';
import '../dist/lyne-components/lyne-components.css';

defineCustomElements();

const getBreakpointTokens = () =>
  TokensRaw.tokens.filter(
    (token) => token.path.includes('breakpoint') && token.attributes.item === 'min'
  );

const getViewports = () => {
  /**
   * CHROMATIC RESTRICTIONS:
   * - min allowed value = 320
   * - max allowed value = 1800
   */
  return getBreakpointTokens().map((breakpoint) => {
    if (breakpoint.value > 1800) {
      return 1800;
    } else if (breakpoint.value < 320) {
      return 320;
    }

    return breakpoint.value;
  });
};

const getBreakpointNames = () => {
  const breakpointNames = {};

  getBreakpointTokens().forEach((breakpoint) => {
    breakpointNames[breakpoint.attributes.type] = breakpoint.value;
  });

  return breakpointNames;
};

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 1000,
    viewports: getViewports(),
  },
  breakpoints: {
    breakpointNames: getBreakpointNames(),
    debounceTimeout: 10,
  },
  options: {
    storySort: {
      // Story section order.
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      order: [
        'pages',
        ['home', 'home personalized'],
        'components',
        ['*', 'form elements', 'timetable', 'cards', 'layout'],
        'styles',
        'brand elements',
        '*',
        'internals',
        'lab',
      ],
    },
  },
};
