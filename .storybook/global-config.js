import * as DesignTokens from 'lyne-design-tokens/dist/js/tokens.es6';

/**
 * As per chromatic docu, viewport can be any whole number
 * between 320 and 1800 pixels.
 */
export const viewports = [
  `${DesignTokens.BreakpointZeroMax}px`,
  `${DesignTokens.BreakpointMicroMax}px`,
  `${DesignTokens.BreakpointSmallMax}px`,
  `${DesignTokens.BreakpointMediumMax}px`,
  `${DesignTokens.BreakpointLargeMax}px`,
  `${DesignTokens.BreakpointWideMax}px`,
  `${DesignTokens.BreakpointUltraMin}px`
];
