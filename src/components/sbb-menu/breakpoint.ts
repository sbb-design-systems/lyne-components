export function isMediumUltra(): boolean {
  const mediumBreakpoint = getComputedStyle(document.documentElement).getPropertyValue(
    '--sbb-breakpoint-medium-min'
  );
  return window.matchMedia(`(min-width: ${mediumBreakpoint})`).matches;
}
