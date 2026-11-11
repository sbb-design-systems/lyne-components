import {
  SbbBreakpointLargeMin,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
  SbbBreakpointZeroMax,
} from '@sbb-esta/lyne-design-tokens';

const baseFontSizePx = 16;

export const sbbBreakpointZeroMaxPx = parseFloat(SbbBreakpointZeroMax) * baseFontSizePx;
export const sbbBreakpointSmallMinPx = parseFloat(SbbBreakpointSmallMin) * baseFontSizePx;
export const sbbBreakpointLargeMinPx = parseFloat(SbbBreakpointLargeMin) * baseFontSizePx;
export const sbbBreakpointUltraMinPx = parseFloat(SbbBreakpointUltraMin) * baseFontSizePx;
