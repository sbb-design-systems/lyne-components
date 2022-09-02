type Breakpoint = 'zero' | 'micro' | 'small' | 'medium' | 'wide' | 'large' | 'ultra';

export function isBreakpoint(from: Breakpoint, to: Breakpoint): boolean {
  const computedStyle = getComputedStyle(document.documentElement);

  const breakpointMin = computedStyle.getPropertyValue(`--sbb-breakpoint-${from}-min`);
  const breakpointMax = computedStyle.getPropertyValue(`--sbb-breakpoint-${to}-max`);

  const media = window.matchMedia(
    `(min-width: ${breakpointMin}) and (max-width: ${breakpointMax})`
  ).matches;

  return media;
}
