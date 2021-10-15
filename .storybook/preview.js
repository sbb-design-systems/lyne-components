import TokensRaw from 'lyne-design-tokens/dist/js/tokens-raw.json';
import {defineCustomElements} from '../dist/esm/loader';

defineCustomElements();

const getBreakpointTokens = () => {
  const tokens = TokensRaw.tokens;

  return tokens.filter((token) => {
    const isBreakpoint = token.attributes.category === 'breakpoint';
    const isMax = token.attributes.item === 'max';

    return isBreakpoint && isMax;
  });
}

const getViewports = () => {
  const viewports = [];

  getBreakpointTokens().forEach((breakpoint) => {
    viewports.push(breakpoint.value);
  });

  // CHROMATIC HAS A MAX ALLOWED VALUE OF 1800, SO WE NEED TO HACK AROUND IT
  viewports.map((viewport) => {
    if (viewport > 1800) {
      return 1800;
    }

    return viewport;
  });

  return viewports;
};

const getBreakpointNames = () => {
  const breakpointNames = {};

  getBreakpointTokens().forEach((breakpoint) => {  
    breakpointNames[breakpoint.name] = breakpoint.value;
  });

  return breakpointNames;
};

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 1000,
    viewports: getViewports()
  },
  breakpoints: {
    breakpointNames: getBreakpointNames(),
    debounceTimeout: 10
  }
};
