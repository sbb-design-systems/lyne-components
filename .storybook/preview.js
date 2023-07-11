import TokensRaw from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens-raw.json';
import { defineCustomElements } from '../dist/esm/loader';
import '../dist/lyne-components/lyne-components.css';

defineCustomElements();

const getBreakpointTokens = () =>
  TokensRaw.tokens.filter(
    (token) => token.path.includes('breakpoint') && token.attributes.item === 'min',
  );

const ensureBounds = (breakpoint) => {
  if (breakpoint > 1800) {
    return 1800;
  } else if (breakpoint < 320) {
    return 320;
  }

  return breakpoint;
};

const getViewports = () => {
  /**
   * CHROMATIC RESTRICTIONS:
   * - min allowed value = 320
   * - max allowed value = 1800
   */
  return getBreakpointTokens().map((breakpoint) => ensureBounds(breakpoint.value));
};

const getBreakpointNames = () => {
  const breakpointNames = {};

  getBreakpointTokens().forEach((breakpoint) => {
    breakpointNames[breakpoint.attributes.type] = breakpoint.value;
  });

  return breakpointNames;
};

const getStorybookViewports = () =>
  getBreakpointTokens().reduce((viewports, breakpoint) => {
    viewports[breakpoint.attributes.type] = {
      name: `Breakpoint ${breakpoint.attributes.type}`,
      styles: {
        width: `${ensureBounds(breakpoint.value)}px`,
        height: '',
      },
    };
    return viewports;
  }, {});

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 2000,
    viewports: getViewports(),
    disableSnapshot: true,
  },
  breakpoints: {
    breakpointNames: getBreakpointNames(),
    debounceTimeout: 10,
  },
  viewport: { viewports: getStorybookViewports() },
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
