import * as DesignTokens from 'lyne-design-tokens/dist/js/tokens.es6';
import {defineCustomElements} from '../dist/esm/loader';

defineCustomElements();

export const parameters = {
  // Set the viewports in Chromatic globally.
  chromatic: {
    delay: 1000,
    viewports: [
      `${DesignTokens.BreakpointZeroMax}px`,
      `${DesignTokens.BreakpointMicroMax}px`,
      `${DesignTokens.BreakpointSmallMax}px`,
      `${DesignTokens.BreakpointMediumMax}px`,
      `${DesignTokens.BreakpointLargeMax}px`,
      `${DesignTokens.BreakpointWideMax}px`,
      `${DesignTokens.BreakpointUltraMin}px`
    ]
  }
};
