type Breakpoint = 'zero' | 'micro' | 'small' | 'medium' | 'wide' | 'large' | 'ultra';

/**
 * Checks whether the document matches a particular media query.
 * It will rely on the global CSS variables to determine the value of the breakpoints.
 *
 * @param from The breakpoint corresponding to the `min-width` value of the media query.
 * @param to The breakpoint corresponding to the `max-width` value of the media query (optional).
 * @returns A boolean indicating whether the window matches the breakpoint.
 */
export function isBreakpoint(from: Breakpoint = 'zero', to?: Breakpoint): boolean {
  const computedStyle = getComputedStyle(document.documentElement);

  const breakpointMin = computedStyle.getPropertyValue(`--sbb-breakpoint-${from}-min`);
  const breakpointMax = to ? computedStyle.getPropertyValue(`--sbb-breakpoint-${to}-max`) : '100vw';

  return window.matchMedia(`(min-width: ${breakpointMin}) and (max-width: ${breakpointMax})`)
    .matches;
}
