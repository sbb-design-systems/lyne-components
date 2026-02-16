import {
  SbbBreakpointLargeMin,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
} from '@sbb-esta/lyne-design-tokens';

const baseFontSizePx = 16;

export const sbbBreakpointSmallMinPx = parseFloat(SbbBreakpointSmallMin) * baseFontSizePx;
export const sbbBreakpointLargeMinPx = parseFloat(SbbBreakpointLargeMin) * baseFontSizePx;
export const sbbBreakpointUltraMinPx = parseFloat(SbbBreakpointUltraMin) * baseFontSizePx;
