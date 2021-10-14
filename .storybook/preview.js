import * as DesignTokens from 'lyne-design-tokens/dist/js/tokens.es6';
import {defineCustomElements} from '../dist/esm/loader';

defineCustomElements();

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 1000,
    viewports: [
      DesignTokens.BreakpointZeroMax,
      DesignTokens.BreakpointMicroMax,
      DesignTokens.BreakpointSmallMax,
      DesignTokens.BreakpointMediumMax,
      DesignTokens.BreakpointLargeMax,
      DesignTokens.BreakpointWideMax,
      DesignTokens.BreakpointUltraMin
    ]
  },
  breakpoints: {
    breakpointNames: {
      'zero': DesignTokens.BreakpointZeroMax,
      'micro': DesignTokens.BreakpointMicroMax,
      'small': DesignTokens.BreakpointSmallMax,
      'medium': DesignTokens.BreakpointMediumMax,
      'large': DesignTokens.BreakpointLargeMax,
      'wide': DesignTokens.BreakpointWideMax,
      'ultra': DesignTokens.BreakpointUltraMax
    },
    debounceTimeout: 0
  }
};
