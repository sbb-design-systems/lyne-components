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
  }
};
