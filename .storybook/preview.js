import TokensRaw from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens-raw.json';
import { defineCustomElements } from '../dist/esm/loader';

defineCustomElements();

const getBreakpointTokens = () => {
  const tokens = TokensRaw.tokens;

  return tokens.filter((token) => {
    const isBreakpoint = token.attributes.category === 'breakpoint';
    const isMin = token.attributes.item === 'min';

    return isBreakpoint && isMin;
  });
};

const getViewports = () => {
  let viewports = [];

  getBreakpointTokens().forEach((breakpoint) => {
    viewports.push(breakpoint.value);
  });

  /**
   * CHROMATIC RESTRICTIONS:
   * - min allowed value = 320
   * - max allowed value = 1800
   */
  viewports = viewports.map((viewport) => {
    if (viewport > 1800) {
      return 1800;
    }

    if (viewport < 320) {
      return 320;
    }

    return viewport;
  });

  return viewports;
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
        'brand elements',
        '*',
        'internals',
        'lab',
      ],
    },
  },
};
